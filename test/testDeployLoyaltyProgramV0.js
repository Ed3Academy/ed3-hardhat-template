const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");
const moment = require("moment");
const couponNFTLocation = require("../nfts/location/coupon/location.json");

// npx hardhat test ./test/testDeployLoyaltyProgramV0.js
describe("Ed3Coupon mint test", function () {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();

    // 部署积分
    const pointTotalSupply = 10000;
    const pointName = "Ed3LoyaltyPoints";
    const pointSymbol = "ELP";
    const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
    const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointName, pointSymbol, pointTotalSupply);

    // 部署服务窗口 GateV0
    const ticketPrice = ethers.utils.parseEther("0.001");
    const pointsPerTicket = 1000;
    const ticketTotalSupply = 1000;
    const Ed3AirlineGateV0 = await ethers.getContractFactory("Ed3AirlineGateV0");
    const ed3AirlineGateV0 = await Ed3AirlineGateV0.deploy(
      ticketPrice,
      ticketTotalSupply,
      ed3LoyaltyPoints.address,
      pointsPerTicket,
    );
    await ed3LoyaltyPoints.transferOwnership(ed3AirlineGateV0.address);

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
      ticketPrice,
      ticketTotalSupply,
      ed3AirlineGateV0,
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
        const {
          ticketPrice,
          ticketTotalSupply,
          ed3AirlineGateV0,
          ed3LoyaltyPoints,
          pointTotalSupply,
          pointsPerTicket,
          ed3Coupon,
          owner,
        } = await loadFixture(deployFixture);
        // console.log(await myToken.connect(owner).estimateGas.mint(owner.address,{ value: ticketPrice }));
        await ed3AirlineGateV0.connect(owner).mint(owner.address, { value: ticketPrice });
        const ed3AirlineTicketBalance = await ed3AirlineGateV0.userTickets(owner.address);
        const ed3LoyaltyPointsBalance = await ed3LoyaltyPoints.balanceOf(owner.address);
        console.log("ed3AirlineGateV0 ticket balance:", ed3AirlineTicketBalance);
        console.log("ed3LoyaltyPoints balance:", ed3LoyaltyPointsBalance);
        console.log("ed3LoyaltyPoints approve address:", ed3Coupon.address);
        await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, 0);
        await ed3LoyaltyPoints.connect(owner).approve(ed3Coupon.address, ed3LoyaltyPointsBalance);
        console.log("ed3Coupon balance before:", await ed3Coupon.balanceOf(owner.address));
        await ed3Coupon.connect(owner).mint(owner.address);
        expect(await ed3Coupon.balanceOf(owner.address)).to.equal(1);
        console.log("ed3Coupon token balance after:", await ed3Coupon.balanceOf(owner.address));
      });
    });
  });
});
