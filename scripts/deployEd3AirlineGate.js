const { ethers } = require("hardhat");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");
const couponNFTLocation = require("../nfts/location/coupon/location.json");
const moment = require("moment");

// npx hardhat run ./scripts/deployEd3AirlineGate.js --network PolygonMumbai
async function main() {
  const [owner] = await ethers.getSigners();
  // 部署机票
  const ticketNFTName = "Ed3AirTickets";
  const ticketNFTSymbol = "Ed3AirTickets";
  const count = 10000;
  const mintPrice = 10 ** 14;
  console.log("Deploying contracts with the account: " + owner.address);
  const metadata = `https://raw.githubusercontent.com/Ed3Academy/ed3-hardhat-template/main/nfts/metadata_fix/ticket.json`;
  const Ed3AirTicketNFT = await ethers.getContractFactory("Ed3AirTicketNFT");
  const launchDate = moment("2023-03-12 00:00");
  const ed3AirTicketNFT = await Ed3AirTicketNFT.deploy(
    ticketNFTName,
    ticketNFTSymbol,
    metadata,
    mintPrice,
    count,
    Math.round(launchDate.valueOf() / 1000),
    owner.address,
  );
  console.log("机票---------------------------------------");
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${ticketNFTName} ${ticketNFTSymbol} ${metadata} ${mintPrice} ${count} ${Math.round(
      launchDate.valueOf() / 1000,
    )} ${owner.address}`,
  );

  // 部署积分
  const pointTotalSupply = 10000;
  const pointName = "Ed3LoyaltyPoints";
  const pointSymbol = "ELP";
  const Ed3LoyaltyPoints = await ethers.getContractFactory("Ed3LoyaltyPoints");
  const ed3LoyaltyPoints = await Ed3LoyaltyPoints.deploy(pointName, pointSymbol, pointTotalSupply);
  console.log("积分---------------------------------------");
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3LoyaltyPoints.address}" ${pointName} ${pointSymbol} ${pointTotalSupply}`,
  );

  // 部署服务窗口 Gate
  const pointsPerTicket = 1000;
  const Ed3AirlineGate = await ethers.getContractFactory("Ed3AirlineGate");
  const ed3AirlineGate = await Ed3AirlineGate.deploy(
    ed3LoyaltyPoints.address,
    ed3AirTicketNFT.address,
    pointsPerTicket,
  );
  await ed3LoyaltyPoints.transferOwnership(ed3AirlineGate.address);
  console.log("服务窗口---------------------------------------");
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3AirlineGate.address}" ${ed3LoyaltyPoints.address} ${ed3AirTicketNFT.address} ${pointsPerTicket}`,
  );

  // 部署优惠券 Coupon
  const couponName = "Ed3Coupon";
  const couponSymbol = "Ed3Coupon";
  const couponMetadata = `https://raw.githubusercontent.com/Ed3Academy/ed3-hardhat-template/main/nfts/metadata_fix/coupon.json`;
  const couponMintPrice = 1000;
  const couponCount = 100000;
  const Ed3Coupon = await ethers.getContractFactory("Ed3Coupon");
  const couponLaunchDate = moment("2023-03-12 00:00");
  const ed3Coupon = await Ed3Coupon.deploy(
    ed3LoyaltyPoints.address,
    couponName,
    couponSymbol,
    couponMetadata,
    couponMintPrice,
    couponCount,
    Math.round(couponLaunchDate.valueOf() / 1000),
    owner.address,
  );
  console.log("优惠券---------------------------------------");
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3Coupon.address}" ${
      ed3LoyaltyPoints.address
    } ${couponName} ${couponSymbol} ${couponMetadata} ${pointsPerTicket} ${couponCount} ${Math.round(
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
