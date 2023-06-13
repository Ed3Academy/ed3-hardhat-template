import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

module.exports = {
  solidity: "0.8.9",
  networks: {
    PolygonMumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    apiKey: {
      polygonMumbai: process.env.POLYGONMUMBAI_SCAN_API_KEY,
    },
  },
};
