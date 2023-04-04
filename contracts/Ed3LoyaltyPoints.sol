// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ed3LoyaltyPoints is ERC20, ERC20Burnable, Ownable {
    uint256 public ed3LoyaltyPointsLeft;

    constructor(uint256 _totalSupply) ERC20("Ed3LoyaltyPoints", "ELP") {
        _mint(msg.sender, _totalSupply);
        ed3LoyaltyPointsLeft = _totalSupply;
    }

    function mint(address _to, uint256 _mintTokenNumber) external onlyOwner {
        require(ed3LoyaltyPointsLeft > _mintTokenNumber, "Ed3LoyaltyPoints exhausted");
        ed3LoyaltyPointsLeft = ed3LoyaltyPointsLeft - _mintTokenNumber;
        _mint(_to, _mintTokenNumber);
    }

    function decimals() public view virtual override returns (uint8) {
        return 1;
    }
}
