// npx hardhat run ./scripts/deployEd3LoyaltyPoints.js  --network PolygonMumbai
const hre = require("hardhat");
const { ethers } = require("hardhat");
const moment = require("moment");
async function main() {
  // 部署积分
  const pointTotalSupply = 10000;
  const pointName = "Ed3LoyaltyPoints";
  const pointSymbol = "ELP";
  const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
  const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointName, pointSymbol, pointTotalSupply);
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3LoyaltyPoints.address}" ${pointName} ${pointSymbol} ${pointTotalSupply}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
