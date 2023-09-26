// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract Test{
uint[] public myArray;

function Test() public{
 myArray.push(1)
 myArray.push(10)
 myArray.push(100)
}
function getAllArrayItems() public view returns(uint[]) {
 return myArray
}
function getMyArrayLength() public view returns(uint) {
 return myArray.length
}
function getMyFirstArray() public view returns(uint) {
 return myArray[0]
}

}