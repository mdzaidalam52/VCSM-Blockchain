// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Delivery.sol";

contract Manufacturer{
    address public owner;

    struct stock{
        uint price;
        uint qty;
    }

    mapping(address => mapping(uint => uint)) ordered_stocks;
    mapping(uint => stock) stocks;
    mapping(address => mapping(uint => uint)) out_for_delivery;
    
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the manufacturer");
        _;
    }

    function receiveOrder(uint vac, uint qty, address _admin) public payable {
        require(stocks[vac].qty < qty, "Insufficient Stock");
        ordered_stocks[_admin][vac] += qty;
        stocks[vac].qty -= qty;
        // Add Delivery functionality
    }

    function createDelivery(uint vac, uint qty, address _admin) public{
        require(ordered_stocks[_admin][vac] >= qty, "Order placed is less");
        ordered_stocks[_admin][vac] -= qty;
        Delivery delivery = new Delivery(owner, _admin, vac, qty);
        out_for_delivery[address(delivery)][vac] = qty;
    }

    function finishDelivery(address delivery, uint vac, uint qty) public{
        out_for_delivery[delivery][vac] -= qty;
    }

    function addStocks(uint vac, uint qty) public onlyOwner{
        stocks[vac].qty += qty;
    }
}