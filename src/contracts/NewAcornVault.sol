// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AcornVault is ERC20("aGLP", "aGLP"), ReentrancyGuard, Ownable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeMath for uint256;
  using Address for address payable;

  IERC20 public stakedGlp;
  uint256 public depositFee = 1; // 0.1%
  uint256 public withdrawFee = 1; // 0.1%
  address payable public feeReceiver;
  IERC20 public rewardToken;  // ETH or ACORN tokens
  uint256 public rewardRate;
  bool public rewardsEnabled = false;

  mapping(address => uint256) public lastRewardBlock;
  mapping(address => uint256) public rewards;

  EnumerableSet.AddressSet private holders;

  constructor(IERC20 _stakedGlp, address payable _feeReceiver) {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    stakedGlp = _stakedGlp;
    feeReceiver = _feeReceiver;
  }

  // Treasury can fund the reward pool with ETH or ACORN tokens
  function fundRewardPool(uint256 amount) external onlyOwner {
      require(rewardToken.transferFrom(msg.sender, address(this), amount), "Funding failed");
      emit RewardFunded(amount);
  }

  // Treasury can set the reward rate
  function setRewardRate(uint256 newRate) external onlyOwner {
      rewardRate = newRate;
  }

  // Treasury can enable or disable rewards
  function toggleRewards(bool enabled) external onlyOwner {
      rewardsEnabled = enabled;
  }

  // New internal function
  function _toggleRewards(bool enabled) internal {
      rewardsEnabled = enabled;
  }

  // Treasury can set the reward token, initially set it to ACORN address
  function setRewardToken(address newRewardToken) external onlyOwner {
      rewardToken = IERC20(newRewardToken);
  }

  // Internal function to update rewards for a user
  function updateRewards(address user) internal {
    if (rewardsEnabled && lastRewardBlock[user] > 0) {
      uint256 blockDelta = block.number - lastRewardBlock[user];
      
      // Adjust balance of user to have 18 decimals
      uint256 adjustedUserBalance = balanceOf(user).mul(1e18);
      
      // The reward rate is already scaled by 1e18.
      uint256 acornNeeded = adjustedUserBalance
                              .mul(rewardRate)
                              .mul(blockDelta)
                              .div(1e18);  // Adjusted for 18 decimal places
      
      // Check if there is enough ACORN in the contract to distribute rewards
      if (rewardToken.balanceOf(address(this)) < acornNeeded) {
        // Disable rewards if not enough ACORN
        _toggleRewards(false);
        return;
      }

      rewards[user] = rewards[user].add(acornNeeded);
    }
    lastRewardBlock[user] = block.number;
  }

  // Users can claim their ACORN rewards
  function claimRewards() external {
      updateRewards(msg.sender);

      uint256 pendingRewards = rewards[msg.sender];
      require(pendingRewards > 0, "No rewards to claim");

      rewards[msg.sender] = 0;
      require(rewardToken.transfer(msg.sender, pendingRewards), "Reward transfer failed");

      emit RewardClaimed(msg.sender, pendingRewards);
  }

    // Allow users to deposit tokens into the vault
  function deposit(uint256 glpAmount) external nonReentrant {
    require(glpAmount > 0, "Amount must be greater than 0");

    // Update the rewards before proceeding with the deposit
    updateRewards(msg.sender);

    uint256 fee = glpAmount.mul(depositFee).div(1000);
    uint256 amountAfterFee = glpAmount.sub(fee);

    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    if (fee > 0) {
    stakedGlp.safeTransfer(feeReceiver, fee);
}

    _mint(msg.sender, amountAfterFee);
    holders.add(msg.sender);

    emit Deposit(msg.sender, glpAmount);
  }

  //Allow the treasury to deposit tokens into the vault for liquidity
  function depositOwner(uint256 glpAmount) external onlyOwner {
    require(glpAmount > 0, "Amount must be greater than 0");
    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    emit OwnerDeposit(msg.sender, glpAmount);
  }

  // Allow holders to withdraw their tokens and yield
  function withdraw(uint256 aGlpAmount) public nonReentrant {
      require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");

      //Calculate glpToReturn
      uint256 glpToReturn = aGlpAmount
                                .mul(stakedGlp.balanceOf(address(this)))
                                .div(totalSupply());

      //1:1 Redeemability check
      require(glpToReturn == aGlpAmount, "Cannot redeem 1:1 due to lack of liquidity");

      // Step 3: Update the rewards before proceeding with the withdrawal
      updateRewards(msg.sender);

      //Burn tokens
      _burn(msg.sender, aGlpAmount);

      uint256 fee = glpToReturn.mul(withdrawFee).div(1000);
      uint256 amountAfterFee = glpToReturn.sub(fee);

      //Transfer funds
      require(stakedGlp.balanceOf(address(this)) >= amountAfterFee, "Not enough GLP in contract");
      stakedGlp.transfer(msg.sender, amountAfterFee);

      if (fee > 0) {
        stakedGlp.transfer(feeReceiver, fee);
      }

      if (balanceOf(msg.sender) == 0) {
          holders.remove(msg.sender);
      }

      emit Withdraw(msg.sender, aGlpAmount);
  }

   // Allow the treasury to withdraw tokens for yield strategies
  function withdrawOwner(uint256 percentage) external onlyOwner {
    require(percentage > 0 && percentage <= 50, "Percentage must be between 1 and 50");
    uint256 amountToWithdraw = stakedGlp.balanceOf(address(this)).mul(percentage).div(100);
    stakedGlp.transfer(owner(), amountToWithdraw);
  }

  //Distribute yield to holders
  function distributeAGLP(uint256 glpAmount) external onlyOwner {
    require(glpAmount > 0, "Amount must be greater than 0");

    // Transfer the glpAmount from the Treasury to the contract
    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);

    uint256 totalCurrentSupply = totalSupply();
    for (uint256 i = 0; i < holders.length(); i++) {
        address holder = holders.at(i);
        uint256 holderBalance = balanceOf(holder);
        
        // Calculate the new aGLP tokens for the holder
        uint256 newAGLP = glpAmount.mul(holderBalance).div(totalCurrentSupply);
        
        // Mint new aGLP tokens for the holder
        _mint(holder, newAGLP);
    }
    emit Distribution(msg.sender, glpAmount);
  }
  
  //Treasury management fee
  function setFeeReceiver(address payable _feeReceiver) external onlyOwner {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    feeReceiver = _feeReceiver;
    emit FeeReceiverUpdated(_feeReceiver);
  }

  // Allow the Treasury to set the deposit fee
  function setDepositFee(uint256 _depositFee) external onlyOwner {
    depositFee = _depositFee;
  }

  // Allow the Treasury to set the withdrawal fee
  function setWithdrawFee(uint256 _withdrawFee) external onlyOwner {
    withdrawFee = _withdrawFee;
  }

  function decimals() public view virtual override returns (uint8) {
    return 18; // Replace with the correct number of decimals for the underlying token
  }

  event Deposit(address indexed user, uint256 amount);
  event OwnerDeposit(address indexed owner, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);
  event FeeReceiverUpdated(address newFeeReceiver);
  event Distribution(address indexed owner, uint256 amount);
  event RewardClaimed(address indexed user, uint256 amount);
  event RewardFunded(uint256 amount);
}