// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IGlpRewardRouter {
    function mintAndStakeGlp(
        address _token,
        uint256 _amount,
        uint256 _minUsdg,
        uint256 _minGlp
    ) external payable;
    function handleRewards(bool compoundRewards, bool unstake, bool restake) external;
}

contract aGlpVault is ERC20("aGLP", "aGLP"), ReentrancyGuard, Ownable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeMath for uint256;
  using Address for address payable;

  IERC20 public stakedGlp;
  address constant glpRewardRouter = 0xB95DB5B167D75e6d04227CfFFA61069348d271F5;
  uint256 public depositFee = 1; // 0.1%
  uint256 public withdrawFee = 1; // 0.1%
  address payable public feeReceiver;
  uint256 public rewardFee = 10; // 10%

  EnumerableSet.AddressSet private holders;

  constructor(IERC20 _stakedGlp, address payable _feeReceiver) {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    stakedGlp = _stakedGlp;
    feeReceiver = _feeReceiver;
  }

  function deposit(uint256 glpAmount) external nonReentrant {
    uint256 fee = glpAmount.mul(depositFee).div(1000);
    uint256 amountAfterFee = glpAmount.sub(fee);
    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    _mint(msg.sender, amountAfterFee);
    holders.add(msg.sender);
    emit Deposit(msg.sender, glpAmount);
  }

  function withdraw(uint256 aGlpAmount) public {
    require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");
    uint256 glpToReturn = aGlpAmount.mul(stakedGlp.balanceOf(address(this))).div(totalSupply());
    _burn(msg.sender, aGlpAmount);
    require(stakedGlp.balanceOf(address(this)) >= glpToReturn, "Not enough GLP in contract");
    stakedGlp.transfer(msg.sender, glpToReturn);
    emit Withdraw(msg.sender, aGlpAmount);
  }

  function distributeFee(uint256 _rewardAmount) internal returns (uint256) {
    uint256 feeAmount = _rewardAmount.mul(rewardFee).div(100);
    (bool success, ) = feeReceiver.call{value: feeAmount}("");
    require(success, "Transfer failed");
    return _rewardAmount.sub(feeAmount);
  }

  function earn() external nonReentrant {
    IGlpRewardRouter router = IGlpRewardRouter(glpRewardRouter);
    router.handleRewards(false, false, false);

    uint256 netReward = distributeFee(address(this).balance);
    uint256 glpAmount = convertEthToGlp(netReward);
    uint256 _totalSupply = totalSupply();

    _mint(address(this), glpAmount);

    for (uint i = 0; i < holders.length(); i++) {
        address holder = holders.at(i);
        uint256 balance = balanceOf(holder);
        uint256 amountToMint = balance.mul(glpAmount).div(_totalSupply);
        _mint(holder, amountToMint);
    }
    emit RewardDistributed(glpAmount);
  }

  function setFeeReceiver(address payable _feeReceiver) external onlyOwner {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    feeReceiver = _feeReceiver;
    emit FeeReceiverUpdated(_feeReceiver);
  }

  function setRewardFee(uint256 _rewardFee) external onlyOwner {
    require(_rewardFee <= 20, "Reward fee cannot be more than 20%");
    rewardFee = _rewardFee;
    emit RewardFeeUpdated(_rewardFee);
  }

  function convertEthToGlp(uint _amount) internal returns (uint) {
    IGlpRewardRouter router = IGlpRewardRouter(glpRewardRouter);
    uint ethToConvert = _amount.mul(90).div(100); // Calculate 90% of the reward amount
    uint glpBalanceBefore = stakedGlp.balanceOf(address(this));
    router.mintAndStakeGlp{value: ethToConvert}(address(0), ethToConvert, 0, 0); // Use 90% of the reward amount
    return stakedGlp.balanceOf(address(this)).sub(glpBalanceBefore);
  }

  event Deposit(address indexed user, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);
  event RewardDistributed(uint256 reward);
  event FeeReceiverUpdated(address newFeeReceiver);
  event RewardFeeUpdated(uint256 newRewardFee);
}
