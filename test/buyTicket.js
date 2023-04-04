const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
// npx hardhat test ./test/buyTicket.js
describe("Ed3LoyaltyPoints", function () {
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
    return {
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
      const { ed3LoyaltyPoints, ed3AirTicket, owner } = await loadFixture(deployFixture);
      expect(await ed3AirTicket.owner()).to.equal(owner.address);
      expect(await ed3LoyaltyPoints.owner()).to.equal(ed3AirTicket.address);
    });

    it("Should set the right ticketPrice", async function () {
      const { ed3LoyaltyPoints, ed3AirTicket, ticketPrice, ticketTotalSupply, pointTotalSupply } = await loadFixture(
        deployFixture,
      );
      console.log("ed3AirTicket.ticketPrice()", await ed3AirTicket.ticketPrice());
      console.log("ed3AirTicket.totalSupply()", await ed3AirTicket.totalSupply());
      console.log("ed3LoyaltyPoints.totalSupply()", await ed3LoyaltyPoints.totalSupply());
      expect(await ed3AirTicket.ticketPrice()).to.equal(ticketPrice);
      expect(await ed3AirTicket.totalSupply()).to.equal(ticketTotalSupply);
      expect(await ed3LoyaltyPoints.totalSupply()).to.equal(pointTotalSupply);
    });
  });

  describe("Mint", function () {
    describe("mint", function () {
      it("Should mint the right token number to mint account", async function () {
        const { ed3LoyaltyPoints, ed3AirTicket, ticketPrice, pointsPerTicket, otherAccount } = await loadFixture(
          deployFixture,
        );
        await ed3AirTicket.connect(otherAccount).mint(otherAccount.address, { value: ticketPrice });
        expect(await ed3AirTicket.balanceOf(otherAccount.address)).to.equal(1);
        expect(await ed3LoyaltyPoints.balanceOf(otherAccount.address)).to.equal(pointsPerTicket);
        console.log(
          "ethers.provider.getBalance(ed3AirTicket.address)",
          await ethers.provider.getBalance(ed3AirTicket.address),
        );
        console.log(
          "ethers.provider.getBalance(ed3LoyaltyPoints.address)",
          await ethers.provider.getBalance(ed3LoyaltyPoints.address),
        );
      });
    });
  });
});
