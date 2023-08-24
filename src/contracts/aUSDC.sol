// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract aUsdcVault is ERC20("aUSDC", "aUSDC"), ReentrancyGuard, Ownable {
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeMath for uint256;
  using Address for address payable;

  IERC20 public stakedGlp;
  uint256 public depositFee = 1; // 0.1%
  uint256 public withdrawFee = 1; // 0.1%
  address payable public feeReceiver;

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

  function depositOwner(uint256 glpAmount) external onlyOwner {
    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    emit OwnerDeposit(msg.sender, glpAmount);
  }

  function withdraw(uint256 aGlpAmount) public {
    require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");
    uint256 glpToReturn = aGlpAmount.mul(stakedGlp.balanceOf(address(this))).div(totalSupply());
    _burn(msg.sender, aGlpAmount);
    require(stakedGlp.balanceOf(address(this)) >= glpToReturn, "Not enough GLP in contract");
    stakedGlp.transfer(msg.sender, glpToReturn);
    emit Withdraw(msg.sender, aGlpAmount);
  }

  function withdrawOwner(uint256 percentage) external onlyOwner {
    require(percentage > 0 && percentage <= 100, "Percentage must be between 1 and 100");
    uint256 amountToWithdraw = stakedGlp.balanceOf(address(this)).mul(percentage).div(100);
    stakedGlp.transfer(owner(), amountToWithdraw);
  }

  function setFeeReceiver(address payable _feeReceiver) external onlyOwner {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    feeReceiver = _feeReceiver;
    emit FeeReceiverUpdated(_feeReceiver);
  }

  event Deposit(address indexed user, uint256 amount);
  event OwnerDeposit(address indexed owner, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);
  event FeeReceiverUpdated(address newFeeReceiver);
}



