require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { ALCHEMY_GOERLI_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
