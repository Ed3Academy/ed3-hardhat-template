// npx hardhat run ./scripts/deployEd3AirTicket.js  --network PolygonMumbai
const hre = require("hardhat");
const { ethers } = require("hardhat");
const moment = require("moment");
// 在这里修改元数据地址
const NFTLocation = require("../nfts/location/ticket/location.json");
// 部署机票
async function main() {
  const ticketNFTName = "Ed3AirTickets";
  const ticketNFTSymbol = "Ed3AirTickets";
  const count = 10000;
  const mintPrice = 10 ** 14;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  const { metadata } = NFTLocation;
  const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
  const launchDate = moment("2023-03-12 00:00");
  const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
    ticketNFTName,
    ticketNFTSymbol,
    `ipfs://${metadata}/`,
    mintPrice,
    count,
    Math.round(launchDate.valueOf() / 1000),
    deployer.address,
  );
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${ticketNFTName} ${ticketNFTSymbol} ipfs://${metadata}/ ${mintPrice} ${count} ${Math.round(
      launchDate.valueOf() / 1000,
    )} ${deployer.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
