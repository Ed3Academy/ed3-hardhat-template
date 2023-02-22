const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

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

    return { myToken, mintPrice, mintTokenNumber, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { myToken, owner } = await loadFixture(deployFixture);

      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should set the right mintPrice", async function () {
      const { myToken, mintPrice } = await loadFixture(deployFixture);

      expect(await myToken.mintPrice()).to.equal(mintPrice);
    });
  });

  describe("Mint", function () {
    describe("mint", function () {
      it("Should mint the right token number to mint account", async function () {
        const { myToken, mintPrice, mintTokenNumber, owner, otherAccount } = await loadFixture(deployFixture);

        //   console.log(await myToken.connect(otherAccount).estimateGas.mint(otherAccount.address,{ value: mintPrice }));
        await myToken.connect(otherAccount).mint(otherAccount.address, { value: mintPrice });
        expect(await ethers.provider.getBalance(myToken.address)).to.equal(mintPrice);

        //   const accountTokenBalance = await myToken.balanceOf(otherAccount.address);

        //   expect(accountTokenBalance).to.equal(mintTokenNumber);

        // await expect(myToken.connect(otherAccount).mint(otherAccount.address,{ value: mintPrice }))
        //   .to.changeEtherBalance(myToken.address, mintPrice)
        //   .to.changeEtherBalance(otherAccount.address, -mintPrice)
        //   .to.changeTokenBalance(myToken, otherAccount.address, mintTokenNumber);
      });
    });
  });
});
