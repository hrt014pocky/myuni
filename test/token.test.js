/*
 * @Date: 2021-12-12 01:26:47
 * @LastEditors: Szang
 * @LastEditTime: 2021-12-12 01:36:06
 * @FilePath: \myuni\test\token.test.js
 */

const Token = artifacts.require('Token')

function tokensToWei(n) {
  return web3.utils.toWei(n, 'ether');
}

function tokensFromWei(n) {
  return web3.utils.fromWei(n, 'ether');
}


contract('SunToken', function(accounts){

  before(async () => {
    kitty = await Token.new('KITTY', 'KITTY', tokensToWei('1000000'))
    doge  = await Token.new('DOGE' , 'DOGE' , tokensToWei('1000000'))
    shib  = await Token.new('SHIB' , 'SHIB' , tokensToWei('1000000'))
  })

  describe('token normal param ', async () => {
    it('initializes the contract with correct values', async () => {
      const kName = await kitty.name()
      const dName = await doge.name()
      const sName = await shib.name()

      assert.equal(kName, 'KITTY')
      assert.equal(dName, 'DOGE')
      assert.equal(sName, 'SHIB')

    })
  })
})
