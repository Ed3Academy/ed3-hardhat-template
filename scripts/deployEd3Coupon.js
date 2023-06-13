// npx hardhat run ./scripts/deployEd3Coupon.js  --network PolygonMumbai
const { ethers } = require("hardhat");
const moment = require("moment");
// 在这里修改元数据地址
const couponNFTLocation = require("../nfts/location/coupon/location.json");

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

  // 部署优惠券 Coupon
  const couponName = "Ed3Coupon";
  const couponSymbol = "Ed3Coupon";
  const couponMetadata = couponNFTLocation.metadata;
  const couponMintPrice = 1000;
  const couponCount = 1000;
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
    } ${couponName} ${couponSymbol} ipfs://${couponMetadata}/ ${couponMintPrice} ${couponCount} ${Math.round(
      couponLaunchDate.valueOf() / 1000,
    )} ${owner.address}`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
