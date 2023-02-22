// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const ethers = require("ethers");

async function main() {
  let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
  let wallet = new ethers.Wallet(privateKey);
  console.log(`wallet from privateKey: ${wallet.address} - ${wallet.privateKey}`);

  // Connect a wallet to mainnet
  let provider = ethers.getDefaultProvider();
  let walletWithProvider = new ethers.Wallet(privateKey, provider);
  console.log(`Connect a wallet to mainnet: ${walletWithProvider.address} - ${walletWithProvider.privateKey}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
