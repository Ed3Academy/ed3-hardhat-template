// npx hardhat run ./scripts/deployEd3AirTicket.js  --network PolygonMumbai
const hre = require("hardhat");
const { ethers } = require("hardhat");
const moment = require("moment");
// 在这里获取元数据地址
const NFTLocation = require("../nfts/location/ticket/location.json");
// 部署机票
async function main() {
  // 编写机票合约部署脚本deployEd3AirTicket.js
  //请在此处编写代码
  /********** Begin **********/

  /********** End **********/
  console.log(
    `npx hardhat verify --network PolygonMumbai "${
      ed3AirTicketNFT.address
    }" ${ticketNFTName} ${ticketNFTSymbol} ${metadata} ${mintPrice} ${count} ${Math.round(
      launchDate.valueOf() / 1000,
    )} ${deployer.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
