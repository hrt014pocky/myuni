// SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

import './PockyERC20.sol';
import './Token.sol';
import './libraries/Math.sol';

/* fields: 
  1. 工厂合约
  2. 代币0地址
  3. 代币1地址
  4. 代币0储备量
  5. 代币1储备量
  6. 交易区块时间记录
  7. 最小流动性

  methods
  1. getReserves(): uint256
  2. mint()
  3. burn()
  4. swap()
  5. skim()
  6. sync()
*/

contract PockyPair is PockyERC20 {

  // 最小流动性 提高攻击成本
  uint public constant MINIMUM_LIQUIDITY = 10**3;

  address public factory;
  address public token0;
  address public token1;

  uint112 private reserve0;
  uint112 private reserve1;
  uint32  private blockTimestampLast;

  function getReserves() public view returns(
    uint112 _reserve0, 
    uint112 _reserve1
    // uint32 _blockTimestampLast
  ) 
  {
    _reserve0 = reserve0;
    _reserve1 = reserve1;
    // _blockTimestampLast = blockTimestampLast;
  }

  constructor() public {
    factory = msg.sender;
  }

  function initialize(address _token0, address _token1) external {
    // require((token0 == token1), "PAIR: THE_SAMEADDRESS");
    require(msg.sender == factory, 'PAIR: FORBIDDEN'); // sufficient check
    token0 = _token0;
    token1 = _token1;
  }

  // 更新储备量
  function _update(uint balance0, uint balance1) private {
    reserve0 = uint112(balance0);
    reserve1 = uint112(balance1);
  }

  function mint(address to) external returns (uint liquidity){
    //1. 获取储备量
    //2. 获取Pair合约中两种代币的balance
    //3. balance - reserve = 新添加的代币数额amount
    //4. 计算流动性  当前pair的totalSupply=0,
        //(1) 流动性 = 根号(amount0 * amount1) - 最小流动性
        //(2) 把最小流动性打入地址0
        //          当前pair的totalSupply!=0,
        //(1) 流动性 = min((amount0 * totalSupply / reserve0), 
                      //   (amount0 * totalSupply / reserve1))
    //5. 判断流动性不等于0
    //6. 调用ERC20的_mint()函数
    //7. 更新数据
    //8. 发送Mint事件
    // (uint112 _reserve0, uint112 _reserve1, ) = getReserves();
    uint256 balance0 = Token(token0).balanceOf(address(this));
    uint256 balance1 = Token(token1).balanceOf(address(this));
    // uint256 amount0 = balance0 - uint256(_reserve0);
    // uint256 amount1 = balance1 - uint256(_reserve1);

    // if(totalSupply == 0){
    //   liquidity = Math.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
    //   _mint(address(0),MINIMUM_LIQUIDITY);
    // }
    // else {
    //   liquidity = Math.min((amount0 * totalSupply / _reserve0), 
    //                ((amount0 * totalSupply / reserve1)));
    // }

    liquidity = 2000;

    // require(liquidity > 0, "PAIR: INSUFFICIENT_LIQUIDITY_MINTED");
    _mint(to, liquidity);
    _update(balance0, balance1);


  }

  
}