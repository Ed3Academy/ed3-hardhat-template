// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  // 使用加密文件来加载钱包
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = wallet.connect(provider);

  let mintPrice = ethers.utils.parseEther("0.001");

  let mintTokenNumber = ethers.constants.WeiPerEther.mul(ethers.BigNumber.from(100));

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const MyTokenFactory = await ethers.getContractFactory("MyToken");
  const myToken = await MyTokenFactory.deploy(mintPrice, mintTokenNumber);

  await myToken.deployed();
  // what happens when we deploy to our hardhat network?
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await myToken.deployTransaction.wait(10);
    await verify(myToken.address, [mintPrice, mintTokenNumber]);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
