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
    const couponName = "Ed3Coupon";
    const couponSymbol = "Ed3Coupon";
    const couponMetadata = `https://raw.githubusercontent.com/Ed3Academy/ed3-hardhat-template/main/nfts/metadata_fix/coupon.json`;
    const couponMintPrice = 1000;
    const maxSupply = 2;
    const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
    const couponLaunchDate = moment("2023-03-12 00:00");
    const ed3Coupon = await Ed3Coupon.deploy(
      ed3LoyaltyPoints.address,
      couponName,
      couponSymbol,
      couponMetadata,
      couponMintPrice,
      maxSupply,
      Math.round(couponLaunchDate.valueOf() / 1000),
      owner.address,
    );

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
      // 校验优惠券名称
      expect(await ed3Coupon.name()).to.equal(couponName);
      // 校验优惠券symbol
      expect(await ed3Coupon.symbol()).to.equal(couponSymbol);
      // 校验优惠券单价
      expect(await ed3Coupon.mintPrice()).to.equal(couponMintPrice);
      // couponMintPrice
      expect(await ed3Coupon.launchDate()).to.equal(Math.round(couponLaunchDate.valueOf() / 1000));
      // 校验优惠券发行数量
      expect(await ed3Coupon.maxSupply()).to.equal(maxSupply);
    });
  });

  describe("Different Token Id", function () {
    it("Token Id Should Be Different", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { couponMintPrice, ed3Coupon, owner, ed3LoyaltyPoints, pointTotalSupply } = await loadFixture(
        deployFixture,
      );
      // 优惠券需要通过积分兑换得到。这里需要mint积分后再用于兑换优惠券
      await ed3LoyaltyPoints.connect(owner).mint(owner.address, pointTotalSupply);
      const mintTime = 2;
      await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, 0);
      await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, pointTotalSupply);
      for (let i = 0; i < mintTime; i++) {
        await ed3Coupon.connect(owner).mint(owner.address);
      }
      // 校验不同token的id不同
      const couponNum = Number(await ed3Coupon.balanceOf(owner.address));
      const readTokenId = new Set();
      for (let i = 0; i < couponNum; i++) {
        readTokenId.add(await ed3Coupon.tokenOfOwnerByIndex(owner.address, i));
      }
      expect(readTokenId.size).to.equal(mintTime);
    });
  });

  describe("Mint fail", function () {
    it("Should fail", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { couponMintPrice, ed3Coupon, owner, ed3LoyaltyPoints, pointTotalSupply } = await loadFixture(
        deployFixture,
      );
      // 优惠券需要通过积分兑换得到。这里需要mint积分后再用于兑换优惠券
      await ed3LoyaltyPoints.connect(owner).mint(owner.address, pointTotalSupply);
      const mintCounts = 2;
      await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, 0);
      await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, pointTotalSupply);
      for (let i = 0; i < mintCounts; i++) {
        await ed3Coupon.connect(owner).mint(owner.address);
      }
      // 铸造不超过上限
      await expect(ed3Coupon.connect(owner).mint(owner.address)).to.be.revertedWith("Maximum supply reached");
    });
  });
});
