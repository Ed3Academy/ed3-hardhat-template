// npx hardhat run ./scripts/deployEd3Coupon.js  --network PolygonMumbai
const { ethers } = require("hardhat");
const moment = require("moment");
// 在这里修改元数据地址
const couponNFTLocation = require("../nfts/location/coupon/location.json");

async function main() {
  const [owner] = await ethers.getSigners();

  // 部署积分
  //请在此处编写代码
  /********** Begin **********/

  /********** End **********/
  // 部署优惠券 Coupon
  //请在此处编写代码
  /********** Begin **********/

  /********** End **********/

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
