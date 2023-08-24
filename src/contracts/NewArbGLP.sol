pragma solidity ^0.8.1;

interface IGMXRouter {
    function stakeGmx(uint256 amount) external;
    function unstakeGmx(uint256 amount) external;
    function compound() external;
    function claimFees() external;
    function mintAndStakeGlp(
        address _token,
        uint256 _amount,
        uint256 _minUsdg,
        uint256 _minGlp
    ) external returns (uint256);
    function unstakeAndRedeemGlp(
        address _tokenOut,
        uint256 _glpAmount,
        uint256 _minOut,
        address _receiver
    ) external returns (uint256);
    function feeGlpTracker() external view returns (address);
    function feeGmxTracker() external view returns (address);
    function stakedGmxTracker() external view returns (address);
    function glpManager() external view returns (address);
    function glp() external view returns (address);
    function signalTransfer(address _receiver) external;
    function acceptTransfer(address _sender) external;
}


// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract aGlpVault is ERC20("aGLP", "aGLP"), ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    IERC20 public stakedGlp;
    uint256 public depositFee = 1; // 0.1%
    uint256 public withdrawFee = 1; // 0.1%
    address payable public feeReceiver;
    uint256 public rewardFee = 10; // 10%
    address public minter;
    address public chef;
    address public native;

    EnumerableSet.AddressSet private holders;

    constructor(IERC20 _stakedGlp, address payable _feeReceiver, address _minter, address _chef, address _native) {
        require(_feeReceiver != address(0), "Fee receiver cannot be zero address");
        stakedGlp = _stakedGlp;
        feeReceiver = _feeReceiver;
        minter = _minter;
        chef = _chef;
        native = _native;
    }

    function deposit(uint256 glpAmount) external nonReentrant {
        // Harvesting logic before deposit
        _harvest();

        uint256 fee = glpAmount * depositFee / 1000;
        uint256 amountAfterFee = glpAmount - fee;
        stakedGlp.safeTransferFrom(msg.sender, address(this), glpAmount);
        stakedGlp.safeTransfer(feeReceiver, fee); // Transfer deposit fee to feeReceiver
        _mint(msg.sender, amountAfterFee);
        holders.add(msg.sender);
        emit Deposit(msg.sender, glpAmount);
    }


    function withdraw(uint256 aGlpAmount) public {
        require(balanceOf(msg.sender) >= aGlpAmount, "Not enough aGLP balance");
        uint256 glpToReturn = aGlpAmount * stakedGlp.balanceOf(address(this)) / totalSupply();
        uint256 fee = glpToReturn * withdrawFee / 1000; // Calculate the withdrawal fee
        uint256 amountAfterFee = glpToReturn - fee;
        _burn(msg.sender, aGlpAmount);
        require(stakedGlp.balanceOf(address(this)) >= glpToReturn, "Not enough GLP in contract");
        stakedGlp.safeTransfer(feeReceiver, fee); // Transfer withdrawal fee to feeReceiver
        stakedGlp.safeTransfer(msg.sender, amountAfterFee); // Send remaining amount to user
        if (balanceOf(msg.sender) == 0) {
            holders.remove(msg.sender);
        }
        emit Withdraw(msg.sender, aGlpAmount);
    }

    function harvest() external onlyOwner {
        _harvest();
    }

    function _harvest() internal {
        IGMXRouter(chef).compound(); // Claim and restake esGMX and multiplier points
        IGMXRouter(chef).claimFees();
        uint256 nativeBal = IERC20(native).balanceOf(address(this));
        if (nativeBal > 0) {
            uint256 feeAmount = nativeBal * rewardFee / 100;
            feeReceiver.transfer(feeAmount);
            uint256 before = balanceOf(address(this));
            mintGlp();
            uint256 wantHarvested = balanceOf(address(this)) - before;

            emit StratHarvest(msg.sender, wantHarvested, balanceOf(address(this)));
        }
    }

    // mint more GLP with the ETH earned as fees
    function mintGlp() internal {
        // Store the GLP balance before minting
        uint256 beforeMintingGlpBalance = stakedGlp.balanceOf(address(this));

        uint256 nativeBal = IERC20(native).balanceOf(address(this));
        IGMXRouter(minter).mintAndStakeGlp(native, nativeBal, 0, 0);

        // Get the GLP balance after minting
        uint256 afterMintingGlpBalance = stakedGlp.balanceOf(address(this));

        // Determine the amount of newly minted GLP tokens
        uint256 mintedGlpAmount = afterMintingGlpBalance - beforeMintingGlpBalance;

        // The total aGLP supply will be used to calculate the proportion
        uint256 totalAGlpSupply = totalSupply();

        // Iterate through all holders and mint corresponding aGLP tokens based on their proportion
        for (uint256 i = 0; i < holders.length(); i++) {
            address holder = holders.at(i);
            uint256 holderBalance = balanceOf(holder);

            // Calculate the holder's proportion
            uint256 holderProportion = holderBalance * mintedGlpAmount / totalAGlpSupply;

            // Mint the proportional aGLP tokens for the holder
            _mint(holder, holderProportion);
        }
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

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event StratHarvest(address indexed harvester, uint256 wantHarvested, uint256 tvl);
    event FeeReceiverUpdated(address newFeeReceiver);
    event RewardFeeUpdated(uint256 newRewardFee);
}