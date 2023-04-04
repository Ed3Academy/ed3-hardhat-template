const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const fs = require("fs-extra");
const path = require("path");
const NFTLocation = require("../nfts/location.json");
const moment = require("moment");
const { verify } = require("../utils/verify");
// npx hardhat run ./scripts/deployLoyaltyProgram.js --network PolygonMumbai
// npx hardhat run ./scripts/deployLoyaltyProgram.js --network localhost
async function main() {
  const depolymentJSON = { chainId: hre.network.config.chainId, url: hre.network.config.url };

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  // Ed3LoyaltyPoints totalSupply
  let pointTotalSupply = 10000;
  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();
  const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
  const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointTotalSupply);
  // await verify(ed3LoyaltyPoints.address, [pointTotalSupply]);
  console.log(`npx hardhat verify --network PolygonMumbai ${ed3LoyaltyPoints.address} ${pointTotalSupply}`);

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
  // await verify(ed3AirTicket.address, [ticketPrice, ticketTotalSupply, ed3LoyaltyPoints.address, pointsPerTicket]);
  console.log(
    `npx hardhat verify --network PolygonMumbai ${ed3AirTicket.address} ${ticketPrice} ${ticketTotalSupply} ${ed3LoyaltyPoints.address} ${pointsPerTicket}`,
  );

  const couponName = "Ed3Coupon";
  const couponSymbol = "Ed3Coupon";
  console.log("Deploying contracts with the account: " + owner.address);
  const { metadata, count } = NFTLocation;
  const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
  const launchDate = moment("2022-07-12 09:30");
  const ed3Coupon = await Ed3Coupon.deploy(
    ed3LoyaltyPoints.address,
    couponName,
    couponSymbol,
    `ipfs://${metadata}/`,
    pointsPerTicket,
    count,
    Math.round(launchDate.valueOf() / 1000),
    owner.address,
  );

  console.log(
    `npx hardhat verify --network PolygonMumbai ${ed3Coupon.address} ${
      ed3LoyaltyPoints.address
    } ${couponName} ${couponSymbol} ipfs://${metadata}/ ${pointsPerTicket} ${count} ${Math.round(
      launchDate.valueOf() / 1000,
    )} ${owner.address}`,
  );

  depolymentJSON.ed3AirTicket = ed3AirTicket.address;
  depolymentJSON.ed3LoyaltyPoints = ed3LoyaltyPoints.address;
  depolymentJSON.ed3Coupon = ed3Coupon.address;

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
