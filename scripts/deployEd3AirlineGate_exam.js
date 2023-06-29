const { ethers } = require("hardhat");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");
const couponNFTLocation = require("../nfts/location/coupon/location.json");
const moment = require("moment");

// npx hardhat run ./scripts/deployEd3AirlineGate.js --network PolygonMumbai
async function main() {
  const [owner] = await ethers.getSigners();
  //1.部署机票合约，并获取地址
  //请在此处编写代码
  /********** Begin **********/
  /********** End **********/
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${ticketNFTName} ${ticketNFTSymbol} ${metadata} ${mintPrice} ${count} ${Math.round(
      launchDate.valueOf() / 1000,
    )} ${owner.address}`,
  );

  //2.部署积分合约，并获取地址
  //请在此处编写代码
  /********** Begin **********/
  /********** End **********/
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3LoyaltyPoints.address}" ${pointName} ${pointSymbol} ${pointTotalSupply}`,
  );

  //3.部署服务窗口，指定接受的积分地址、机票地址、积分兑换优惠券比例，将积分合约的owner权限转移给服务窗口
  //请在此处编写代码
  /********** Begin **********/
  /********** End **********/
  console.log(
    `npx hardhat verify --network PolygonMumbai "${ed3AirlineGate.address}" ${ed3LoyaltyPoints.address} ${ed3AirTicketNFT.address} ${pointsPerTicket}`,
  );

  //4.部署优惠券合约，并获取地址
  //请在此处编写代码
  /********** Begin **********/
  /********** End **********/
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
