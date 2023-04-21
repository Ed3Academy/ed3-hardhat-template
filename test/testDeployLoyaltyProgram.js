const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");
const couponNFTLocation = require("../nfts/location/coupon/location.json");

// npx hardhat test ./test/testDeployLoyaltyProgram.js
describe("Ed3Coupon mint test", function () {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();

    // 部署机票
    const ticketNFTName = "Ed3AirTicket";
    const ticketNFTSymbol = "Ed3AirTicket";
    const ticketMintPrice = 10 ** 14;
    const [deployer] = await ethers.getSigners();
    const ticketMetadata = ticketNFTLocation.metadata;
    const ticketCount = ticketNFTLocation.count;
    // 获取合约对象
    const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
    // 设置ERC721开始发售时间
    const ticketLaunchDate = moment("2023-03-12 00:00");
    // 部署合约
    const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
      ticketNFTName,
      ticketNFTSymbol,
      `ipfs://${ticketMetadata}/`,
      ticketMintPrice,
      ticketCount,
      Math.round(ticketLaunchDate.valueOf() / 1000),
      deployer.address,
    );

    // 部署积分
    const pointTotalSupply = 10000;
    const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
    const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy("Ed3LoyaltyPoints", "ELP", pointTotalSupply);

    // 部署服务窗口 Gate
    const pointsPerTicket = 1000;
    const Ed3AirlineGate = await ethers.getContractFactory("Ed3AirlineGate");
    const ed3AirlineGate = await Ed3AirlineGate.deploy(
      ed3LoyaltyPoints.address,
      ed3AirTicketNFT.address,
      pointsPerTicket,
    );
    await ed3LoyaltyPoints.transferOwnership(ed3AirlineGate.address);

    // 部署优惠券 Coupon
    const couponName = "Ed3Coupon";
    const couponSymbol = "Ed3Coupon";
    const couponMetadata = couponNFTLocation.metadata;
    const couponMintPrice = 1000;
    const couponCount = couponNFTLocation.count;
    const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
    const couponLaunchDate = moment("2023-03-12 00:00");
    const ed3Coupon = await Ed3Coupon.deploy(
      ed3LoyaltyPoints.address,
      couponName,
      couponSymbol,
      `ipfs://${couponMetadata}/`,
      couponMintPrice,
      couponCount,
      Math.round(couponLaunchDate.valueOf() / 1000),
      owner.address,
    );

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
    it("Should set the right owner", async function () {
      const { ed3Coupon, owner } = await loadFixture(deployFixture);
      console.log("ed3Coupon.address", ed3Coupon.address);
      expect(await ed3Coupon.owner()).to.equal(owner.address);
    });

    it("ed3Coupon should set the right mintPrice", async function () {
      const { ed3Coupon, pointsPerTicket } = await loadFixture(deployFixture);
      expect(await ed3Coupon.mintPrice()).to.equal(pointsPerTicket);
    });
  });

  describe("Mint", function () {
    describe("exchange coupon", function () {
      it("Should mint the NFT to mint account", async function () {
        const { ticketMintPrice, ed3AirTicketNFT, ed3AirlineGate, ed3LoyaltyPoints, ed3Coupon, owner } =
          await loadFixture(deployFixture);
        // 用户携带ticketMintPrice资金通过服务窗口购买机票
        await ed3AirlineGate.connect(owner).mint(owner.address, { value: ticketMintPrice });
        const ed3AirlineTicketBalance = await ed3AirTicketNFT.balanceOf(owner.address);
        const ed3LoyaltyPointsBalance = await ed3LoyaltyPoints.balanceOf(owner.address);
        console.log("ed3AirlineGate ticket balance:", ed3AirlineTicketBalance);
        console.log("ed3LoyaltyPoints balance:", ed3LoyaltyPointsBalance);
        console.log("ed3LoyaltyPoints approve address:", ed3Coupon.address);
        // 授权积分合约给优惠券合约，如此做才能让优惠券合约收走对应的积分完成兑换
        await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, 0);
        await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, ed3LoyaltyPointsBalance);
        console.log("ed3Coupon balance before:", await ed3Coupon.balanceOf(owner.address));
        // 完成积分的兑换
        await ed3Coupon.connect(owner).mint(owner.address);
        // 校验优惠券的数量为1
        expect(await ed3Coupon.balanceOf(owner.address)).to.equal(1);
        console.log("ed3Coupon token balance after:", await ed3Coupon.balanceOf(owner.address));
      });
    });
  });
});
