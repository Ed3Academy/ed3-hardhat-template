// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const fs = require("fs-extra");
const path = require("path");
const NFTLocation = require("../nfts/location.json");
const moment = require("moment");

async function main() {
  const depolymentJSON = {
    chainId: hre.network.config.chainId,
    url: hre.network.config.url,
  };

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  // deploy MTK
  let mintPrice = ethers.utils.parseEther("0.001");
  let mintTokenNumber = ethers.constants.WeiPerEther.mul(ethers.BigNumber.from(100));
  const MyTokenFactory = await ethers.getContractFactory("MyToken");
  const myToken = await MyTokenFactory.deploy(mintPrice, mintTokenNumber);
  await myToken.deployed();
  // deploy PayableNFT
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
  console.log(
    `npx hardhat verify --network PolygonMumbai ${payableNFT.address} ${myToken.address} Cat Cat ipfs://${metadata}/ ${
      10 ** 14
    } ${count} ${Math.round(launchDate.valueOf() / 1000)} ${deployer.address}`,
  );

  depolymentJSON.PayableNFT = payableNFT.address;
  const deploymentDir = path.join(__dirname, `../deployments/${hre.network.name}`);
  await fs.mkdirp(deploymentDir);
  fs.writeFileSync(path.join(deploymentDir, "deployment.json"), JSON.stringify(depolymentJSON, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
