/*
 * @Date: 2021-12-12 01:03:12
 * @LastEditors: Szang
 * @LastEditTime: 2022-01-02 14:54:53
 * @FilePath: \myuni\migrations\2_delpoy_contracts.js
 */
// const Token = artifacts.require("Token");
const Token = artifacts.require("PockyERC20");

module.exports = async function (deployer) {
  await deployer.deploy(Token)
  // await deployer.deploy(Token, 'AAA', 'AAA', web3.utils.toWei('1000000', 'ether'))

  // await deployer.deploy(Token, 'BBB', 'BBB', web3.utils.toWei('1000000', 'ether'))

  // await deployer.deploy(Token, 'CCC', 'CCC', web3.utils.toWei('1000000', 'ether'))

};
