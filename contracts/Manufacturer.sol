// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Manufacturer {
    address public owner;

    struct stock {
        uint256 price;
        uint256 qty;
    }

    mapping(address => mapping(uint256 => uint256)) ordered_stocks;
    mapping(uint256 => stock) stocks;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the manufacturer");
        _;
    }

    function receiveOrder(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public payable {
        require(stocks[vac].qty < qty, "Insufficient Stock");
        ordered_stocks[_admin][vac] += qty;
        stocks[vac].qty -= qty;
        // Add Delivery functionality
    }

    function addStocks(uint256 vac, uint256 qty) public onlyOwner {
        stocks[vac].qty += qty;
    }
}
