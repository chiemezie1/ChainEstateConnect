require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { API_URL, PRIVATE_KEY } = process.env;
console.log({ API_URL, PRIVATE_KEY });


// module.exports = {
//   defaultNetwork: "polygon_mumbai",
//   networks: {
//     hardhat: {
//       chainId: 80001,
//     },
//     sepolia: {
//       url:API_URL || "https://rpc.ankr.com/polygon_mumbai",
//       accounts:  [`0x${PRIVATE_KEY}`],
//     }
//   },
//   solidity: {
//     version: "0.8.9",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
// }

require("@nomicfoundation/hardhat-toolbox");



module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://eth-goerli.g.alchemy.com/v2/OK5rgXixhGWUSeH4Vi6ZiP6B2OUfDLqx`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};