// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// Ed3积分合约
contract Ed3LoyaltyPoints is ERC20, ERC20Capped, ERC20Burnable, Ownable {
    /**
     * Ed3积分合约构造函数，在部署脚本中传入name、symbol和发行上限
     */
    constructor(string memory name, string memory symbol, uint256 cap) ERC20(name, symbol) ERC20Capped(cap) {}

    function mint(address _to, uint256 _mintTokenNumber) external onlyOwner {
        _mint(_to, _mintTokenNumber);
    }

    /// 重写父类的_mint方法，指明使用的mint方法是 ERC20Capped提供的
    function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        ERC20Capped._mint(account, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 1;
    }
}
