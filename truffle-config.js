/*
 * @Date: 2021-12-11 22:32:42
 * @LastEditors: Szang
 * @LastEditTime: 2021-12-12 01:10:55
 * @FilePath: \myuni\truffle-config.js
 */
// require('babel-register');
// require('babel-polyfill');

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*" // Match any network id
    // },
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
