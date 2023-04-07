// npx hardhat run ./scripts/deployTicket.js  --network PolygonMumbai
const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const moment = require("moment");
// 在这里修改元数据地址
const NFTLocation = require("../nfts/location/ticket/location.json");
const NFTName = "Ed3AirTicket";
const NFTSymbol = "Ed3AirTicket";
const count = 1000;
const mintPrice = 10 ** 14;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  const { metadata } = NFTLocation;
  const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
  const launchDate = moment("2023-03-12 00:00");
  const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
    NFTName,
    NFTSymbol,
    `ipfs://${metadata}/`,
    mintPrice,
    count,
    Math.round(launchDate.valueOf() / 1000),
    deployer.address,
  );
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${NFTName} ${NFTSymbol} ipfs://${metadata}/ ${mintPrice} ${count} ${Math.round(launchDate.valueOf() / 1000)} ${
      deployer.address
    }`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
