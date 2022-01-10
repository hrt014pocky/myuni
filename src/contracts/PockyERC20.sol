// SPDX-License-Identifier: MIT
pragma solidity =0.5.16;

contract PockyERC20 {

  string public name = 'Pocky';
  string public symbol = 'PKY';
  uint8  public decimals = 18;

  uint256 public totalSupply = 0;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  //内部函数
  //1. _mint
  //2. _burn

  function _mint(address _to, uint _value) internal {
    //1. 增加totalSupply
    //2. 增加to的balanceOf
    totalSupply += _value;
    balanceOf[_to] += _value;
  }

  function _burn(address _from, uint _value) internal {
    //1. 减少totalSupply
    //2. 减少_from的balanceOf
    totalSupply -= _value;
    balanceOf[_from] -= _value;
  }

  function approve(address _spender, uint256 _value) external returns(bool){
    //1. require msg.sender的balance是否足够
    //2. _spender的allowance增加
    //3. 触发Approval事件
    require((balanceOf[msg.sender] >= _value), "ERC20: INSUFFICIENT");
    allowance[msg.sender][_spender] += _value;
    emit Approval(msg.sender, _spender, _value);
  }

  function transfer(address _to, uint256 _value) external returns(bool){
    // 1. require msg.sender的balance是否足够
    // 2. msg.sender扣除余额
    // 3. to收账账户增加余额
    // 4. 触发Transfer事件
    require((balanceOf[msg.sender] >= _value), "ERC20: INSUFFICIENT");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
  }

  function transferFrom(address _from, address _to, uint256 _value) external returns(bool) {
    // 1.require _from的balance是否足够
    // 2.require _spender即msg.sender的allowance是否足够
    // 3._from余额减少
    // 4.msg.sender的allowance减少
    // 5._to的余额增加
    // 6.发送Transfer事件
    require((balanceOf[_from] >= _value), "ERC20: INSUFFICIENT_BALANCE");
    require((allowance[_from][msg.sender] >= _value), "ERC20: INSUFFICIENT_ALLOWANCE");
    balanceOf[_from] -= _value;
    allowance[_from][msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
  }
}