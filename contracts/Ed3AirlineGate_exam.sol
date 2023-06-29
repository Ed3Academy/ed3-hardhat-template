// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//2.在contracts目录下将机票合约与积分合约的方法抽象成接口，并在服务窗口中通过import引入
//请在此处编写代码
/********** Begin **********/
/********** End **********/

// @title Ed3航空公司服务窗口，用于用于购买机票并发放积分，同时提供接口让管理员可以转移购买机票的资金。
contract Ed3AirlineGate {
    address payable public ed3TicketNFTAddress;
    address public ed3LoyaltyPointsAddress;
    uint256 public immutable POINTS_PER_TICKET;

    /**
     * @notice 航空公司服务窗口构造函数
     * @param _ed3LoyaltyPointsAddress 积分地址
     * @param _ed3TicketNFTAddress NFT机票地址
     * @param _pointsPerTicket 设置积分兑换优惠券比例
     */
    // 在构造函数中指定可接收的积分地址、机票地址、积分兑换优惠券比例
    //请在此处编写代码
    /********** Begin **********/
    constructor() {}

    /********** End **********/

    /**
     * @notice 购买机票、获取积分的函数
     * @param _to 获得机票和积分的地址
     */
    function mint(address _to) external payable {
        //3.在服务窗口的mint方法中校验用户携带的原生币是否达到机票单价、机票是否已经售罄
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
        // 购买机票NFT
        //4.在服务窗口的mint方法中完成机票的mint与积分的mint操作
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
    }
}
