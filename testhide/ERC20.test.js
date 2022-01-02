/*
 * @Date: 2022-01-02 14:31:46
 * @LastEditors: Szang
 * @LastEditTime: 2022-01-02 22:13:28
 * @FilePath: \myuni\test\hide\ERC20.test.js
 */
const PockyERC20 = artifacts.require('PockyERC20')

function toWei(n){
  return web3.utils.toWei(n, 'ether');
}

contract('ERC20', function(accounts){
  before(async () => {
    token = await PockyERC20.new() // return string type
    admin = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
    user3 = accounts[3]
  })

  describe('Token initializes', function async () {
    it('Check the basic info', async () => {
      const name      = await token.name()
      const symbol    = await token.symbol()
      const decimals  = await token.decimals()
      assert.equal(name, 'Pocky')
      assert.equal(symbol, 'PKY')
      assert.equal(decimals, 18)

      const totalSupply = await token.totalSupply()
      assert.equal(totalSupply.toString(), toWei('1000000'))

    })

    it('Catch transfer action',  async () => {
      // 管理员拥有最初的100W代币
      var adminBalance = await token.balanceOf(admin)
      assert.equal(adminBalance.toString(), toWei('1000000'))

      // 管理员转账给user1 100个代币
      await token.transfer(user1, toWei('100'))
      adminBalance = await token.balanceOf(admin)
      var user1Balance = await token.balanceOf(user1)
      // 判断user1是否收到100个代币
      assert.equal(user1Balance.toString(), toWei('100'))
      // 判断admin账户内剩余代币数量99900
      assert.equal(adminBalance.toString(), toWei('999900'))
    })

    it('transferFrom and approve', async () => {
      // user1授权给user2账户50个代币
      await token.approve(user2, toWei('50'), {from: user1})
      // 查看allowance是否正确
      var allowance = await token.allowance(user1, user2)
      assert.equal(allowance.toString(), toWei('50'))
      // user2使用transferFrom花费user1授权的代币转账给user3
      await token.transferFrom(user1, user3, toWei('10'), {from: user2})
      // 查看user1和user3的账户
      var user1Balance = await token.balanceOf(user1)
      var user3Balance = await token.balanceOf(user3)
      assert.equal(user1Balance.toString(), toWei('90'))
      assert.equal(user3Balance.toString(), toWei('10'))
      // 查看user2剩余授权allwance
      allowance = await token.allowance(user1, user2)
      assert.equal(allowance.toString(), toWei('40'))
    })
  })
})