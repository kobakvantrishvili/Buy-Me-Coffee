import { HardhatUserConfig } from "hardhat/config";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
