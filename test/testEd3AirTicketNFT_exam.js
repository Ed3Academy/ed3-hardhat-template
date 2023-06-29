const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const ticketNFTLocation = require("../nfts/location/ticket/location.json");

// npx hardhat test ./test/testEd3AirTicketNFT.js
describe("Ed3AirTicketNFT test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // 部署机票
    // 1.设置指定机票名称、symbol、机票元数据地址、单价、发行数量1w、发行时间、购买机票收入获取地址
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    //2.通过hardhat-ethers升级接口获取合约对象并完成部署
    //请在此处编写代码
    /********** Begin **********/
    /********** End **********/

    return {
      ticketNFTName,
      ticketNFTSymbol,
      ticketMintPrice,
      ticketLaunchDate,
      maxSupply,
      ed3AirTicketNFT,
      owner,
    };
  }

  describe("Deployment", function () {
    it("Should Check correct attribute", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketNFTName, ticketNFTSymbol, ticketMintPrice, ticketLaunchDate, maxSupply, ed3AirTicketNFT, owner } =
        await loadFixture(deployFixture);
      //请在此处编写代码
      /********** Begin **********/
      // 校验机票名称
      // 校验机票symbol
      // 校验机票单价
      // 校验机票发行时间
      // 校验机票发行数量1w
      /********** End **********/
    });
  });

  describe("Different Token Id", function () {
    it("Token Id Should Be Different", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketMintPrice, ed3AirTicketNFT, owner } = await loadFixture(deployFixture);
      const mintCount = 2;
      for (let i = 0; i < mintCount; i++) {
        await ed3AirTicketNFT.connect(owner).mint(owner.address, { value: ticketMintPrice });
      }
      // 校验不同token的id不同
      //请在此处编写代码
      /********** Begin **********/
      /********** End **********/
    });
  });

  describe("Mint fail", function () {
    it("Should fail", async function () {
      // loadFixture will run the setup the first time, and quickly return to that state in the other tests.
      const { ticketMintPrice, ed3AirTicketNFT, owner } = await loadFixture(deployFixture);
      const mintTime = 2;
      for (let i = 0; i < mintTime; i++) {
        await ed3AirTicketNFT.connect(owner).mint(owner.address, { value: ticketMintPrice });
      }
      // 铸造不超过上限
      //请在此处编写代码
      /********** Begin **********/
      /********** End **********/
    });
  });
});
