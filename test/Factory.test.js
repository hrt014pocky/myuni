/*
 * @Date: 2022-01-02 22:01:33
 * @LastEditors: Szang
 * @LastEditTime: 2022-01-02 23:06:15
 * @FilePath: \myuni\test\Factory.test.js
 */
const PockyERC20    = artifacts.require('PockyERC20')
const PockyFactory  = artifacts.require('PockyFactory')
const PockyPair     = artifacts.require('PockyPair')
const Token         = artifacts.require('Token')

const addr0 = '0xb1Ba616ff5A54f9D876C832902C9e51d0B800237'
const addr1 = '0x52f22e5b7fAb8421F9889b4CF32C1B5AB31c56d8'


function toWei(n){
  return web3.utils.toWei(n, 'ether');
}


contract('Factory', function(accounts){
  before(async () => {
    factory = await PockyFactory.new() // return string type
    kitty = await Token.new('KITTY', 'KITTY', toWei('1000000'))
    doge  = await Token.new('DOGE' , 'DOGE' , toWei('1000000'))
    admin = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
    user3 = accounts[3]
  })

  describe('create2 first use!', async () => {
    it('Public bytecode salt encodePacked', async () => {
      // const pair = await factory.createPair(kitty.address, doge.address)
      // const getPair = await factory.getPair(kitty.address, doge.address)
      const pair = await factory.createPair(addr0, addr1)
      const getPair = await factory.getPair(addr0, addr1)
      assert.notEqual(getPair, null, 'Pair has a correct address')
      // console.log('pair address is ', pair)
      // 判断工厂合约的allPairs长度是否等于1
      const length = await factory.allPairLength();
      assert.equal(length, 1, 'allPairs has one pair')
      // 判断allPairs[0] == getPair
      const all0 = await factory.allPairs(0);
      assert.equal(all0, getPair, 'getPair and allPairs[0] need the same address')
    })
  })
})
