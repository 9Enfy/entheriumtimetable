// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./orario.sol";

contract orarioFactory
{
    address owner;
    mapping (address => Orario) orariDocenti;
    constructor()
    {
        owner = msg.sender;
    }

    function createOrarioDocente() public
    {
        //require(orariDocenti[msg.sender] == Orario(),"Esiste gia il contratto");
        orariDocenti[msg.sender] = new Orario(msg.sender);
    }

    function getOrario(address _account) public view returns (string memory)
    {
        //require(bytes(orariDocenti[_account].retrieve()).length != 0,"Non esiste il contratto");
        return (orariDocenti[_account].retrieve());
    }
    function modifyOrarioDocente(string memory newInfo) public 
    {
        //require(bytes(orariDocenti[msg.sender].retrieve()).length !=0,"Non esiste il contratto");
        orariDocenti[msg.sender].store(newInfo,msg.sender);
    }

}