/*
 * @Date: 2022-01-08 15:14:56
 * @LastEditors: Szang
 * @LastEditTime: 2022-01-10 00:44:46
 * @FilePath: \myuni\test\Pair.test.js
 */

const PockyERC20    = artifacts.require('PockyERC20')
const PockyFactory  = artifacts.require('PockyFactory')
const PockyPair     = artifacts.require('PockyPair')
const Token         = artifacts.require('Token')

function toWei(n){
  return web3.utils.toWei(n, 'ether');
}

function fromWei(n){
  return web3.utils.fromWei(n, 'ether');
}

contract('Pair', function(accounts){
  before(async () => {
    factory = await PockyFactory.new() // return string type
    // factory =  await PockyFactory.deployed()
    kitty = await Token.new('KITTY', 'KITTY', toWei('1000000'))
    doge  = await Token.new('DOGE' , 'DOGE' , toWei('1000000'))
    shib  = await Token.new('SHIB' , 'SHIB' , toWei('1000000'))
    baby  = await Token.new('BABY' , 'BABY' , toWei('1000000'))
    admin = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
    user3 = accounts[3]

    // pair = await factory.createPair(kitty.address, doge.address)
  })

  describe('mint', async () => {
    it('first mint process', async () => {
      // 使用工厂合约创建并部署币对合约
      const pairCreate = await factory.createPair(kitty.address, doge.address)
      // 获取刚创建的pair合约地址
      pairAddr = await factory.allPairs(0)
      pair = await PockyPair.at(pairAddr)
      pairFactoryAddr = await pair.factory()
      // 判断工厂合约地址与在币对合约内的factory地址一致
      // 判断币对合约地址与在工厂合约中的币对合约一致
      // console.log('factory address is ', factory.address)
      // console.log('factory address in pair is ', pairFactoryAddr)
      // console.log('pair address is ', pair.address)
      // console.log('pair address in factory is ', pairAddr)
      assert.equal(pair.address, pairAddr, 'pair address should be same')
      assert.equal(factory.address, pairFactoryAddr, 'factory address should be same')
      //1. 首先向pair合约中转账token0和token1
      //2. 调用pair的mint函数
      // 假设 kitty:doge = 1:200, 这里向合约中转账100枚kitty20000枚doge
      await kitty.transfer(pair.address, toWei('100'))
      await doge.transfer(pair.address, toWei('20000'))
      var pairKittyBalance = await kitty.balanceOf(pair.address)
      var pairDogeBalance = await doge.balanceOf(pair.address)
      assert.equal(pairKittyBalance.toString(),toWei('100'))
      assert.equal(pairDogeBalance.toString(),toWei('20000'))


      const liquidity = await pair.mint(admin)
      // 1. 添加的流动性 = 根号(100 * 20000) - 1000
      // 2. pair的total
      // 3. pair的储备量
      const totalSupply = await pair.totalSupply();
      const reserve = await pair.getReserves();
      console.log('totalSupply is ', totalSupply.toString());
      console.log('reserve0 is ', fromWei(reserve[0]));
      console.log('reserve1 is ', fromWei(reserve[1]));
      console.log(reserve)
      const token0 = await pair.token0()
      const token1 = await pair.token1()
      console.log('token0 addr is ', token0)
      console.log('token1 addr is ', token1)
    })
  })

})
