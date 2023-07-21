// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IStakedGlp {
  function stake(uint256 amount) external;
  function withdraw(uint256 amount) external;
  function claimRewards() external returns (uint256);
}

interface IGlpRewardRouter {
    function mintAndStakeGlp(
        address _token,
        uint256 _amount,
        uint256 _minUsdg,
        uint256 _minGlp
    ) external;
    function handleRewards(bool compoundRewards, bool unstake, bool restake) external; // new function
}

contract aGlpVault is ERC20("aGLP", "aGLP"), ReentrancyGuard, Ownable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeMath for uint256;
  using Address for address payable;

  IERC20 public glp;
  IStakedGlp public stakedGlp;
  address constant glpRewardRouter = 0xB95DB5B167D75e6d04227CfFFA61069348d271F5;
  uint256 public depositFee = 1; // 0.1%
  uint256 public withdrawFee = 1; // 0.1%
  address payable public feeReceiver;
  uint256 public rewardFee = 10; // 10%

  EnumerableSet.AddressSet private holders;

  constructor(IERC20 _glp, address payable _feeReceiver) {
    glp = _glp; // This is the staked GLP token
    stakedGlp = IStakedGlp(address(_glp)); // Cast the GLP token to the IStakedGlp interface
    feeReceiver = _feeReceiver;
  }

  function deposit(uint256 glpAmount) external nonReentrant {
    uint256 fee = glpAmount.mul(depositFee).div(1000);
    uint256 amountAfterFee = glpAmount.sub(fee);
    glp.safeTransferFrom(msg.sender, address(this), glpAmount);
    _mint(msg.sender, amountAfterFee);
    stakedGlp.stake(amountAfterFee);
    holders.add(msg.sender);
    emit Deposit(msg.sender, glpAmount);
  }

  function withdraw(uint256 aGlpAmount) public {
    // Ensure the user has enough aGLP
    require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");

    // Calculate the amount of GLP to return.
    uint256 glpToReturn = aGlpAmount.mul(glp.balanceOf(address(this))).div(totalSupply());

    // Burn the aGLP from the user
    _burn(msg.sender, aGlpAmount);

    // Transfer the GLP back to the user
    // Ensure this contract has enough GLP balance
    require(glp.balanceOf(address(this)) >= glpToReturn, "Not enough GLP in contract");
    glp.transfer(msg.sender, glpToReturn);
}


  function distributeFee(uint256 _rewardAmount) internal {
    uint256 feeAmount = _rewardAmount.mul(rewardFee).div(100);
    feeReceiver.sendValue(feeAmount);
    return _rewardAmount.sub(feeAmount);
  }

function earn() external nonReentrant {
    IGlpRewardRouter router = IGlpRewardRouter(glpRewardRouter);
    router.handleRewards(false, false, false); // choose appropriate flags

    uint256 rewardAmount = stakedGlp.claimRewards();
    uint256 netReward = distributeFee(rewardAmount);
    uint256 glpAmount = convertEthToGlp(netReward); // netReward is used to buy GLP
    uint256 totalSupply = totalSupply();
    _mint(address(this), glpAmount);
    stakedGlp.stake(glpAmount);

    for (uint i = 0; i < holders.length(); i++) {
        address holder = holders.at(i);
        uint256 balance = balanceOf(holder);
        uint256 amountToMint = balance.mul(glpAmount).div(totalSupply);
        _mint(holder, amountToMint);
    }
    emit RewardDistributed(glpAmount);
}


  function setFeeReceiver(address payable _feeReceiver) external onlyOwner {
    feeReceiver = _feeReceiver;
  }

  function setRewardFee(uint256 _rewardFee) external onlyOwner {
    rewardFee = _rewardFee;
  }

  function convertEthToGlp(uint _amount) internal returns (uint) {
    IGlpRewardRouter router = IGlpRewardRouter(glpRewardRouter);
    uint glpBalanceBefore = IERC20(glp).balanceOf(address(this));
    router.mintAndStakeGlp{value: _amount}(address(0), _amount, 0, 0);
    return IERC20(glp).balanceOf(address(this)).sub(glpBalanceBefore);
  }

  event Deposit(address indexed user, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);
  event RewardDistributed(uint256 reward);
}

