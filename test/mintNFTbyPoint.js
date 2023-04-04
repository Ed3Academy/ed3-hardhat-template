const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");
const NFTLocation = require("../nfts/location.json");
const moment = require("moment");

// npx hardhat test ./test/mintNFTbyPoint.js
describe("Ed3Coupon mint test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Ed3LoyaltyPoints totalSupply
    let pointTotalSupply = 10000;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
    const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointTotalSupply);

    // Ed3AirTicket price
    let ticketPrice = ethers.utils.parseEther("0.001");
    let pointsPerTicket = 1000;
    // Ed3AirTicket totalSupply
    let ticketTotalSupply = 1000;
    const Ed3AirTicket = await ethers.getContractFactory("Ed3AirTicket");
    const ed3AirTicket = await Ed3AirTicket.deploy(
      ticketPrice,
      ticketTotalSupply,
      ed3LoyaltyPoints.address,
      pointsPerTicket,
    );
    await ed3LoyaltyPoints.transferOwnership(ed3AirTicket.address);

    console.log("Deploying contracts with the account: " + owner.address);
    const { metadata, count } = NFTLocation;
    const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
    const launchDate = moment("2022-07-12 09:30");
    const ed3Coupon = await Ed3Coupon.deploy(
      ed3LoyaltyPoints.address,
      "Ed3Coupon",
      "Ed3Coupon",
      `ipfs://${metadata}/`,
      pointsPerTicket,
      count,
      Math.round(launchDate.valueOf() / 1000),
      owner.address,
    );
    return {
      ed3Coupon,
      ed3LoyaltyPoints,
      ed3AirTicket,
      ticketPrice,
      ticketTotalSupply,
      pointTotalSupply,
      pointsPerTicket,
      owner,
      otherAccount,
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
          ed3Coupon,
          ed3LoyaltyPoints,
          ed3AirTicket,
          ticketPrice,
          ticketTotalSupply,
          pointTotalSupply,
          pointsPerTicket,
          owner,
          otherAccount,
        } = await loadFixture(deployFixture);
        //   console.log(await myToken.connect(otherAccount).estimateGas.mint(otherAccount.address,{ value: ticketPrice }));
        await ed3AirTicket.connect(otherAccount).mint(otherAccount.address, { value: ticketPrice });
        const ed3AirTicketBalance = await ed3AirTicket.balanceOf(otherAccount.address);
        const ed3LoyaltyPointsBalance = await ed3LoyaltyPoints.balanceOf(otherAccount.address);
        console.log("ed3LoyaltyPoints balance:", ed3LoyaltyPointsBalance);
        console.log("ed3LoyaltyPoints approve address:", ed3Coupon.address);
        await ed3LoyaltyPoints.connect(otherAccount).approve(ed3Coupon.address, 0);
        await ed3LoyaltyPoints.connect(otherAccount).approve(ed3Coupon.address, ed3LoyaltyPointsBalance);
        console.log("ed3Coupon balance before:", await ed3Coupon.balanceOf(otherAccount.address));
        await ed3Coupon.connect(otherAccount).mint(otherAccount.address);
        expect(await ed3Coupon.balanceOf(otherAccount.address)).to.equal(1);
        console.log("ed3Coupon token balance after:", await ed3Coupon.balanceOf(otherAccount.address));
      });
    });
  });
});
