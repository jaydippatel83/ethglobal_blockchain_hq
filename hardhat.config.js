const dotenv = require("dotenv"); 
require("@nomicfoundation/hardhat-toolbox"); 

dotenv.config();

module.exports = {
  solidity: "0.8.27", 
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: 3000000000,
      gas: 600000,
    }
  }
};
