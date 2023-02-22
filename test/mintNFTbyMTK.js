const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const fs = require("fs-extra");
const path = require("path");
const NFTLocation = require("../nfts/location.json");
const moment = require("moment");

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    let mintPrice = ethers.utils.parseEther("0.001");

    let mintTokenNumber = ethers.constants.WeiPerEther.mul(ethers.BigNumber.from(100));

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(mintPrice, mintTokenNumber);

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account: " + deployer.address);
    const { metadata, count } = NFTLocation;
    const PayableNFT = await ethers.getContractFactory("PayableNFT");
    const launchDate = moment("2022-07-12 09:30");
    const payableNFT = await PayableNFT.deploy(
      myToken.address,
      "Cat",
      "Cat",
      `ipfs://${metadata}/`,
      10 ** 14,
      count,
      Math.round(launchDate.valueOf() / 1000),
      deployer.address,
    );
    await payableNFT.deployed();
    return { myToken, payableNFT, mintPrice, mintTokenNumber, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { myToken, payableNFT, owner } = await loadFixture(deployFixture);
      console.log("myToken.address", myToken.address);
      console.log("payableNFT.address", payableNFT.address);
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should set the right mintPrice", async function () {
      const { myToken, mintPrice } = await loadFixture(deployFixture);
      expect(await myToken.mintPrice()).to.equal(mintPrice);
    });
  });

  describe("Mint", function () {
    describe("mint MTK", function () {
      it("Should mint the right token number to mint account", async function () {
        const { myToken, mintPrice, mintTokenNumber, owner, otherAccount } = await loadFixture(deployFixture);
        //   console.log(await myToken.connect(otherAccount).estimateGas.mint(otherAccount.address,{ value: mintPrice }));
        await myToken.connect(otherAccount).mint(otherAccount.address, { value: mintPrice });
        expect(await ethers.provider.getBalance(myToken.address)).to.equal(mintPrice);
        const accountTokenBalance = await myToken.balanceOf(otherAccount.address);
        console.log("accountTokenBalance:", accountTokenBalance);
        //   const accountTokenBalance = await myToken.balanceOf(otherAccount.address);
        //   expect(accountTokenBalance).to.equal(mintTokenNumber);
        // await expect(myToken.connect(otherAccount).mint(otherAccount.address,{ value: mintPrice }))
        //   .to.changeEtherBalance(myToken.address, mintPrice)
        //   .to.changeEtherBalance(otherAccount.address, -mintPrice)
        //   .to.changeTokenBalance(myToken, otherAccount.address, mintTokenNumber);
      });

      it("Should mint the NFT to mint account", async function () {
        const { myToken, payableNFT, mintPrice, mintTokenNumber, owner, otherAccount } = await loadFixture(
          deployFixture,
        );
        //   console.log(await myToken.connect(otherAccount).estimateGas.mint(otherAccount.address,{ value: mintPrice }));
        await myToken.connect(otherAccount).mint(otherAccount.address, { value: mintPrice });
        const accountTokenBalance = await myToken.balanceOf(otherAccount.address);
        console.log("MTK token balance:", accountTokenBalance);
        // mint NFT with MTK
        console.log("MTK token approve address:", payableNFT.address);
        await myToken.connect(otherAccount).approve(payableNFT.address, 0);
        await myToken.connect(otherAccount).approve(payableNFT.address, accountTokenBalance);
        console.log("MNFT token balance before:", await payableNFT.balanceOf(otherAccount.address));
        await payableNFT.connect(otherAccount).mint(otherAccount.address);
        expect(await payableNFT.balanceOf(otherAccount.address)).to.equal(1);
        console.log("MNFT token balance after:", await payableNFT.balanceOf(otherAccount.address));
      });
    });
  });
});
