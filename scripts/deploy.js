// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

async function main() {
  let mintPrice = ethers.utils.parseEther("0.001");

  let mintTokenNumber = ethers.constants.WeiPerEther.mul(ethers.BigNumber.from(100));

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const MyTokenFactory = await ethers.getContractFactory("MyToken");
  const myToken = await MyTokenFactory.deploy(mintPrice, mintTokenNumber);

  await myToken.deployed();
  // what happens when we deploy to our hardhat network?
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await myToken.deployTransaction.wait(10);
    await verify(myToken.address, [mintPrice, mintTokenNumber]);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
