const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");
const couponNFTLocation = require("../nfts/location/coupon/location.json");
const moment = require("moment");

// npx hardhat run ./scripts/deployLoyaltyProgram.js --network PolygonMumbai
// npx hardhat run ./scripts/deployLoyaltyProgram.js --network localhost
async function main() {
  const [owner] = await ethers.getSigners();

  // 部署机票
  const ticketNFTName = "Ed3AirTicket";
  const ticketNFTSymbol = "Ed3AirTicket";
  const ticketMintPrice = 10 ** 14;
  const [deployer] = await ethers.getSigners();
  const ticketMetadata = ticketNFTLocation.metadata;
  const ticketCount = 100000;
  const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
  const ticketLaunchDate = moment("2023-03-12 00:00");
  const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
    ticketNFTName,
    ticketNFTSymbol,
    `ipfs://${ticketMetadata}/`,
    ticketMintPrice,
    ticketCount,
    Math.round(ticketLaunchDate.valueOf() / 1000),
    deployer.address,
  );
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${ticketNFTName} ${ticketNFTSymbol} ipfs://${ticketMetadata}/ ${ticketMintPrice} ${ticketCount} ${Math.round(
      ticketLaunchDate.valueOf() / 1000,
    )} ${deployer.address}`,
  );
  const ed3AirTicketNFTAddress = ed3AirTicketNFT.address;
  // 可以直接使用Ed3提供的机票合约
  // const ed3AirTicketNFTAddress = "0x9637bA532DC66f2b09F4B8b46681640446A178C3";
  // 部署积分，积分数量=机票数量*兑换比例
  const pointTotalSupply = 10 ** 8;
  const pointName = "Ed3LoyaltyPoints";
  const pointSymbol = "ELP";
  const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
  const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointName, pointSymbol, pointTotalSupply);
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3LoyaltyPoints.address}" ${pointName} ${pointSymbol} ${pointTotalSupply}`,
  );

  // 部署服务窗口 Gate
  const pointsPerTicket = 1000;
  const Ed3AirlineGate = await ethers.getContractFactory("Ed3AirlineGate");
  const ed3AirlineGate = await Ed3AirlineGate.deploy(ed3LoyaltyPoints.address, ed3AirTicketNFTAddress, pointsPerTicket);
  await ed3LoyaltyPoints.transferOwnership(ed3AirlineGate.address);
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3AirlineGate.address}" ${ed3LoyaltyPoints.address} ${ed3AirTicketNFTAddress} ${pointsPerTicket}`,
  );

  // 部署优惠券 Coupon
  const couponName = "Ed3Coupon";
  const couponSymbol = "Ed3Coupon";
  const couponMetadata = couponNFTLocation.metadata;
  const couponMintPrice = 1000;
  const couponCount = 100000;
  const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
  const couponLaunchDate = moment("2023-03-12 00:00");
  const ed3Coupon = await Ed3Coupon.deploy(
    ed3LoyaltyPoints.address,
    couponName,
    couponSymbol,
    `ipfs://${couponMetadata}/`,
    couponMintPrice,
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
