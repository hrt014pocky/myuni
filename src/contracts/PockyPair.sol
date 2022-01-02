// SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

import './PockyERC20.sol';


contract PockyPair is PockyERC20 {

  function initialize(address token0, address token1) external {
    // require((token0 == token1), "PAIR: THE_SAMEADDRESS");
  }
  
}