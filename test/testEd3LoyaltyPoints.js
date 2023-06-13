const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

// npx hardhat test ./test/testEd3LoyaltyPoints.js
describe("Ed3LoyaltyPoints test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner] = await ethers.getSigners();

    // 部署积分
    const pointTotalSupply = 100000;
    const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
    const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy("Ed3LoyaltyPoints", "ELP", pointTotalSupply);
    return { owner, pointTotalSupply, ed3LoyaltyPoints };
  }

  describe("Deployment", function () {
    it("Should Check correct attribute", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { owner, pointTotalSupply, ed3LoyaltyPoints } = await loadFixture(deployFixture);
      console.log("ed3LoyaltyPoints.address", ed3LoyaltyPoints.address);
      // 积分的owner为创建者
      expect(await ed3LoyaltyPoints.owner()).to.equal(owner.address);
      // 积分的供应量上限为10w
      expect(await ed3LoyaltyPoints.cap()).to.equal(pointTotalSupply);
      // 积分的精度为1
      expect(await ed3LoyaltyPoints.decimals()).to.equal(1);
    });
  });

  describe("Mint fail", function () {
    it("Should fail", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { owner, pointTotalSupply, ed3LoyaltyPoints } = await loadFixture(deployFixture);
      await ed3LoyaltyPoints.connect(owner).mint(owner.address, pointTotalSupply);
      // 第一次mint成功
      expect(await ed3LoyaltyPoints.balanceOf(owner.address)).to.equal(pointTotalSupply);
      // 铸造积分时不超过10w上限
      await expect(ed3LoyaltyPoints.connect(owner).mint(owner.address, 1)).to.be.revertedWith(
        "ERC20Capped: cap exceeded",
      );
    });
  });
});
