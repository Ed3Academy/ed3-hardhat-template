const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const couponNFTLocation = require("../nfts/location/ticket/location.json");

// npx hardhat test ./test/testEd3Coupon.js
describe("Ed3AirTicketNFT test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner] = await ethers.getSigners();

    // 部署积分
    const pointTotalSupply = 10000;
    const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
    const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy("Ed3LoyaltyPoints", "ELP", pointTotalSupply);
    // 部署优惠券 Coupon
    //2.设置兑换优惠券指定接收的积分地址、优惠券名称、优惠券symbol、元数据地址、单价、供应量上限、发行时间、获得积分收入的地址
    /********** Begin **********/
    /********** End **********/
    //3.通过hardhat-ethers升级接口获取合约对象并完成部署
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    return {
      couponName,
      couponSymbol,
      couponMintPrice,
      couponLaunchDate,
      maxSupply,
      ed3Coupon,
      owner,
      ed3LoyaltyPoints,
      pointTotalSupply,
    };
  }

  describe("Deployment", function () {
    it("Should Check correct attribute", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { couponName, couponSymbol, couponMintPrice, couponLaunchDate, maxSupply, ed3Coupon, owner } =
        await loadFixture(deployFixture);
      //请在此处编写代码
      /********** Begin **********/
      // 校验优惠券名称
      // 校验优惠券symboll
      // 校验优惠券单价
      // 校验couponMintPrice
      // 校验优惠券发行数量
      /********** End **********/
    });
  });

  describe("Different Token Id", function () {
    it("Token Id Should Be Different", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { couponMintPrice, ed3Coupon, owner, ed3LoyaltyPoints, pointTotalSupply } = await loadFixture(
        deployFixture,
      );
      //请在此处编写代码
      // 优惠券需要通过积分兑换得到。这里需要mint积分后再用于兑换优惠券
      // 校验不同token的id不同
      /********** Begin **********/
      /********** End **********/
    });
  });

  describe("Mint fail", function () {
    it("Should fail", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { couponMintPrice, ed3Coupon, owner, ed3LoyaltyPoints, pointTotalSupply } = await loadFixture(
        deployFixture,
      );
      //请在此处编写代码
      // 优惠券需要通过积分兑换得到。这里需要mint积分后再用于兑换优惠券
      // 铸造不超过上限
      /********** Begin **********/
      /********** End **********/
    });
  });
});
