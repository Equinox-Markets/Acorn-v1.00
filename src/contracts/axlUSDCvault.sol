// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract axlUSDCVault is ERC20("aaxlUSDC", "aaxlUSDC"), ReentrancyGuard, Ownable {
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
    require(glpAmount > 0, "Amount must be greater than 0");
    uint256 fee = glpAmount.mul(depositFee).div(1000);
    uint256 amountAfterFee = glpAmount.sub(fee);

    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    stakedGlp.safeTransfer(feeReceiver, fee);

    _mint(msg.sender, amountAfterFee);
    holders.add(msg.sender);
    emit Deposit(msg.sender, glpAmount);
  }

  function depositOwner(uint256 glpAmount) external onlyOwner {
    require(glpAmount > 0, "Amount must be greater than 0");
    stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
    emit OwnerDeposit(msg.sender, glpAmount);
  }

  function withdraw(uint256 aGlpAmount) public nonReentrant {
    require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");

    uint256 glpToReturn = aGlpAmount
                                .mul(stakedGlp.balanceOf(address(this)))
                                .div(totalSupply());
    uint256 fee = glpToReturn.mul(withdrawFee).div(1000);
    uint256 amountAfterFee = glpToReturn.sub(fee);

    _burn(msg.sender, aGlpAmount);
    require(stakedGlp.balanceOf(address(this)) >= amountAfterFee, "Not enough GLP in contract");

    stakedGlp.transfer(msg.sender, amountAfterFee);
    stakedGlp.transfer(feeReceiver, fee);

    if (balanceOf(msg.sender) == 0) {
        holders.remove(msg.sender);
    }

    emit Withdraw(msg.sender, aGlpAmount);
  }

  function distributeAGLP(uint256 glpAmount) external onlyOwner {
    require(glpAmount > 0, "Amount must be greater than 0");

    // Transfer the glpAmount from the owner to the contract
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

  function setFeeReceiver(address payable _feeReceiver) external onlyOwner {
    require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
    feeReceiver = _feeReceiver;
    emit FeeReceiverUpdated(_feeReceiver);
  }

  function setDepositFee(uint256 _depositFee) external onlyOwner {
    depositFee = _depositFee;
  }

  function setWithdrawFee(uint256 _withdrawFee) external onlyOwner {
    withdrawFee = _withdrawFee;
  }

  function decimals() public view virtual override returns (uint8) {
    return 6;
  }

  event Deposit(address indexed user, uint256 amount);
  event OwnerDeposit(address indexed owner, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);
  event FeeReceiverUpdated(address newFeeReceiver);
  event Distribution(address indexed owner, uint256 amount);
}