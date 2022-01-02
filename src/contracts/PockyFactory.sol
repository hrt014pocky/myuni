// SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

import './PockyPair.sol';

/* fields: 
  1. getPair
  2. allPairs

  methods
  1. allPairLength(): uint256
  2. createPair()
*/


contract PockyFactory {
  // 两种质押代币和币对代币之间的映射
  mapping(address => mapping(address => address)) public getPair;
  address[] public allPairs;

  event PairCreate(
    address indexed token0, 
    address indexed token1,
    address indexed pair,
    uint256 PairLength
  );

  function allPairLength() external view returns(uint256) {
    return allPairs.length;
  }


  function createPair(address tokenA, address tokenB) external returns(address pair) {
  //1. 判断两个代币的地址不相等
  //2. 对两个代币排序, 根据地址由小到大
  //3. 判断代币地址不等于0
  //4. 判断币对不在该工厂合约内
  //5. 使用内联汇编创建pair合约
  //6. 调用pair的初始化函数
  //7. 记录getPair
  //8. 记录allPairs
  //9. 触发PairCreate事件
    require((tokenA != tokenB), "FACTORY: IDENTICAL_ADDRESSES");
    (address token0, address token1) = (tokenA < tokenB) ? (tokenA, tokenB) : (tokenB, tokenA);
    require((token0 != address(0)), "FACTORY: ZERO_ADDRESSES");
    require((getPair[token0][token1] == address(0)), "FACTORY: PAIR_EXISTS");

    // create2创建pair合约
    //(1)获取pair合约对的字节码
    //(2)紧打包生成盐
    //(3)内联汇编调用create2()函数
    bytes memory bytecode = type(PockyPair).creationCode;
    bytes32 salt = keccak256(abi.encodePacked(tokenA,tokenB));
    assembly {
      pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
    }

    PockyPair(pair).initialize(token0, token1);

    getPair[tokenA][tokenB] = pair;
    getPair[tokenB][tokenA] = pair;
    allPairs.push(pair);
    emit PairCreate(token0, token1, pair, allPairs.length);
  }
}
