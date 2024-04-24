// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Orario
{
    address private factory;
    address private userOwner;
    string private info;

    constructor(address _userOwner)
    {
        factory = msg.sender;
        userOwner = _userOwner;
    }
    modifier isFactory
    {
        require(factory==msg.sender,"You need to use a factory");
        _;
    }
    modifier isOwner(address _userOwner)
    {
        require(_userOwner==userOwner,"You are not the owner of the contract");
        _;
    }
    
    function store(string memory _info,address caller) public isFactory isOwner(caller)
    {
        info = _info;
    }
    function retrieve() public view returns(string memory _info)
    {
        return(info);
    }
}