const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");

// npx hardhat test ./test/testEd3AirTicketNFT.js
describe("Ed3AirTicketNFT test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // 部署机票
    const ticketNFTName = "Ed3AirTicket";
    const ticketNFTSymbol = "Ed3AirTicket";
    const ticketMintPrice = 10 ** 14;
    const [owner] = await ethers.getSigners();
    const ticketMetadata = ticketNFTLocation.metadata;
    const maxSupply = 2;
    const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
    const ticketLaunchDate = moment("2023-03-12 00:00");
    const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
      ticketNFTName,
      ticketNFTSymbol,
      `ipfs://${ticketMetadata}/`,
      ticketMintPrice,
      maxSupply,
      Math.round(ticketLaunchDate.valueOf() / 1000),
      owner.address,
    );

    return {
      ticketNFTName,
      ticketNFTSymbol,
      ticketMintPrice,
      ticketLaunchDate,
      maxSupply,
      ed3AirTicketNFT,
      owner,
    };
  }

  describe("Deployment", function () {
    it("Should Check correct attribute", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketNFTName, ticketNFTSymbol, ticketMintPrice, ticketLaunchDate, maxSupply, ed3AirTicketNFT, owner } =
        await loadFixture(deployFixture);
      // 校验机票名称
      expect(await ed3AirTicketNFT.name()).to.equal(ticketNFTName);
      // 校验机票symbol
      expect(await ed3AirTicketNFT.symbol()).to.equal(ticketNFTSymbol);
      // 校验机票单价
      expect(await ed3AirTicketNFT.mintPrice()).to.equal(ticketMintPrice);
      // 校验机票发行时间
      expect(await ed3AirTicketNFT.launchDate()).to.equal(Math.round(ticketLaunchDate.valueOf() / 1000));
      // 校验机票发行数量1w
      expect(await ed3AirTicketNFT.maxSupply()).to.equal(maxSupply);
    });
  });

  describe("Different Token Id", function () {
    it("Token Id Should Be Different", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketMintPrice, ed3AirTicketNFT, owner } = await loadFixture(deployFixture);
      const mintTime = 2;
      for (let i = 0; i < mintTime; i++) {
        await ed3AirTicketNFT.connect(owner).mint(owner.address, { value: ticketMintPrice });
      }
      // 校验不同token的id不同
      const ticketNum = Number(await ed3AirTicketNFT.balanceOf(owner.address));
      const readTokenId = new Set();
      for (let i = 0; i < ticketNum; i++) {
        readTokenId.add(await ed3AirTicketNFT.tokenOfOwnerByIndex(owner.address, i));
      }
      expect(readTokenId.size).to.equal(mintTime);
    });
  });

  describe("Mint fail", function () {
    it("Should fail", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketMintPrice, ed3AirTicketNFT, owner } = await loadFixture(deployFixture);
      const mintTime = 2;
      for (let i = 0; i < mintTime; i++) {
        await ed3AirTicketNFT.connect(owner).mint(owner.address, { value: ticketMintPrice });
      }
      // 铸造不超过上限
      await expect(ed3AirTicketNFT.connect(owner).mint(owner.address)).to.be.revertedWith("Maximum supply reached");
    });
  });
});
