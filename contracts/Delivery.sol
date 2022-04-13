// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

import "./Admin.sol";

contract Delivery{
    address from;
    address to;
    uint vaccine;
    uint qty;
    string location;
    uint temp;
    bool open = true;
    uint humidity;

    constructor(address _from, address _to, uint _vaccine, uint _qty){
        from = _from;
        to = _to;
        vaccine = _vaccine;
        qty = _qty;
    }

    function locationUpdate(string memory _location) public {
        location = _location;
    }

    function humidityUpdate(uint _humidity) public {
        humidity = _humidity;
    }
    
    function tempUpdate(uint _temp) public{
        temp = _temp;
    }

    function openUpdate() public{
        open = !open;
    }

    function orderReached() public {
        Admin admin = Admin(to);
        admin.receivedVaccine(vaccine, qty, from);
    }
}