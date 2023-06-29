const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");
const couponNFTLocation = require("../nfts/location/coupon/location.json");
// npx hardhat test ./test/testEd3AirlineGate.js
describe("Ed3AirlineGate test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner] = await ethers.getSigners();

    // 部署机票
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    // 部署积分
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    // 部署服务窗口 Gate
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    // 部署优惠券 Coupon
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    return {
      ticketMintPrice,
      ticketCount,
      ed3AirTicketNFT,
      ed3AirlineGate,
      ed3LoyaltyPoints,
      pointTotalSupply,
      pointsPerTicket,
      ed3Coupon,
      owner,
    };
  }
  describe("Deployment", function () {
    it("Should Check correct attribute", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ed3AirTicketNFT, ed3AirlineGate, ed3LoyaltyPoints, pointsPerTicket } = await loadFixture(deployFixture);
      // 校验积分地址
      expect(await ed3AirlineGate.ed3LoyaltyPointsAddress()).to.equal(ed3LoyaltyPoints.address);
      // 校验机票地址
      expect(await ed3AirlineGate.ed3TicketNFTAddress()).to.equal(ed3AirTicketNFT.address);
      // 校验积分兑换优惠券比例
      console.log(await ed3AirlineGate.POINTS_PER_TICKET());
    });
  });

  describe("Mint", function () {
    describe("exchange coupon", function () {
      it("Should mint the NFT to mint account", async function () {
        const { ticketMintPrice, ed3AirTicketNFT, ed3AirlineGate, ed3LoyaltyPoints, ed3Coupon, owner } =
          await loadFixture(deployFixture);
        //3.在"Mint"模块中完成以下单元测试前置：
        //- 用户携带ticketMintPrice资金通过服务窗口购买机票；
        //- 授权积分合约给优惠券合约；
        //- 完成积分的兑换
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
        //4.在"Mint"模块中断言
        //- 接受的积分地址、机票地址、积分兑换优惠券比例 是否为指定属性值
        //- 此时用户优惠券的数量为1
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
      });
    });
  });
});
