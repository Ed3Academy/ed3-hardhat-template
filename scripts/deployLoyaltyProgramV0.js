const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const couponNFTLocation = require("../nfts/location/coupon/location.json");
const moment = require("moment");
// npx hardhat run ./scripts/deployLoyaltyProgramV0.js --network PolygonMumbai
// npx hardhat run ./scripts/deployLoyaltyProgramV0.js --network localhost
async function main() {
  const [owner] = await ethers.getSigners();

  // 部署积分
  const pointTotalSupply = 10000;
  const pointName = "Ed3LoyaltyPoints";
  const pointSymbol = "ELP";
  const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
  const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointName, pointSymbol, pointTotalSupply);
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3LoyaltyPoints.address}" ${pointName} ${pointSymbol} ${pointTotalSupply}`,
  );

  // 部署服务窗口 GateV0
  const ticketPrice = ethers.utils.parseEther("0.001");
  const pointsPerTicket = 1000;
  const ticketTotalSupply = 1000;
  const Ed3AirlineGateV0 = await ethers.getContractFactory("Ed3AirlineGateV0");
  const ed3AirlineGateV0 = await Ed3AirlineGateV0.deploy(
    ticketPrice,
    ticketTotalSupply,
    ed3LoyaltyPoints.address,
    pointsPerTicket,
  );
  await ed3LoyaltyPoints.transferOwnership(ed3AirlineGateV0.address);
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3AirlineGateV0.address}" ${ticketPrice} ${ticketTotalSupply} ${ed3LoyaltyPoints.address} ${pointsPerTicket}`,
  );

  // 部署优惠券 Coupon
  const couponName = "Ed3Coupon";
  const couponSymbol = "Ed3Coupon";
  const couponMetadata = couponNFTLocation.metadata;
  const couponCount = couponNFTLocation.count;
  const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
  const couponLaunchDate = moment("2023-03-12 00:00");
  const ed3Coupon = await Ed3Coupon.deploy(
    ed3LoyaltyPoints.address,
    couponName,
    couponSymbol,
    `ipfs://${couponMetadata}/`,
    pointsPerTicket,
    couponCount,
    Math.round(couponLaunchDate.valueOf() / 1000),
    owner.address,
  );

  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3Coupon.address}" ${
      ed3LoyaltyPoints.address
    } ${couponName} ${couponSymbol} ipfs://${couponMetadata}/ ${pointsPerTicket} ${couponCount} ${Math.round(
      couponLaunchDate.valueOf() / 1000,
    )} ${owner.address}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
