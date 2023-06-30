// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/*
 * 合约积分
 * ERC20 是以太坊上最常用的代币标准之一，规定了代币的基本功能，包括转账、余额查询、授权转移等。
 * ERC20Capped 是 ERC20 代币标准的一个扩展，它增加了一个代币总供应量的上限限制，同时在发行新代币时检查供应量是否已经达到了上限。
 * ERC20Burnable 是 ERC20 代币标准的一个扩展，它增加了代币的销毁功能，允许代币持有者销毁自己的代币。
 * Ownable 是一个基础合约，它提供了一个拥有者（owner）的概念，允许合约的拥有者执行一些关键操作，例如更改合约状态、转移合约所有权等。
 */
// 请明确积分合约继承ERC20、ERC20Burnable、Ownable、ERC20Capped标准
// 请在此处编写代码
/********** Begin **********/
contract Ed3LoyaltyPoints {
    /********** End **********/

    // 构造函数中指明了积分名称name、积分符号symbol以及积分发行上限
    // 请在构造函数中指定积分发行上限cap
    // 请在此处编写代码
    /********** Begin **********/
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    /********** End **********/

    // mint函数是铸造代币的函数，接收2个参数。
    // 1. 积分的发放对象
    // 2. 积分发放数量
    // mint函数仅限内部函数调用。
    // 同时积分的铸造需要控制调用权限，这里使用修饰器进行限制。
    // 请使用修饰器控制积分的铸造权限
    // 请在此处编写代码
    /********** Begin **********/
    function mint(address _to, uint256 _mintTokenNumber) {
        _mint(_to, _mintTokenNumber);
    }

    /********** End **********/

    // 重写父类的_mint方法，指明使用的mint方法是ERC20Capped提供的
    function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        // 请指明使用的mint方法是ERC20Capped提供的
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
    }

    // 为了让积分便于理解，这里设定代币精度为1
    function decimals() public view virtual override returns (uint8) {
        // 请重写代币精度设置为1
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
    }
}
