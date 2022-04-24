// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Delivery.sol";

contract Manufacturer {
    address public owner;

    struct stockInfo {
        uint256 price;
        uint256 qty;
    }

    struct stocks{
        uint a;
        uint b;
        uint c;
        uint d;
    }

    mapping(address => mapping(uint256 => uint256)) ordered_stocks;
    mapping(uint256 => stockInfo) available_stocks;
    mapping(address => mapping(uint256 => uint256)) out_for_delivery;    
    mapping(uint256 => uint256) public number_of_ordered_stocks;
    mapping(uint256 => uint256) public number_of_out_for_delivery;
    address[] deliveries;

    constructor(address add) {
        owner = add;
    }

    function receiveOrder(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public {
        require(available_stocks[vac].qty >= qty, "Insufficient Stock");
        ordered_stocks[_admin][vac] += qty;
        available_stocks[vac].qty -= qty;
    }

    function createDelivery(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public {
        require(ordered_stocks[_admin][vac] >= qty, "Order placed is less");
        ordered_stocks[_admin][vac] -= qty;
        Delivery delivery = new Delivery(owner, _admin, vac, qty);
        out_for_delivery[address(delivery)][vac] = qty;
        deliveries.push(address(delivery));
    }

    function finishDelivery(
        address delivery,
        uint256 vac,
        uint256 qty
    ) public {
        out_for_delivery[delivery][vac] -= qty;
    }

    function addStocks(uint256 vac, uint256 qty) public {
        available_stocks[vac].qty += qty;
    }

    function getInfo() public view returns(address, stocks memory, stocks memory, stocks memory){
        return (
            owner,
            stocks(
                available_stocks[1].qty,
                available_stocks[2].qty,
                available_stocks[3].qty,
                available_stocks[4].qty
            ),
            stocks(
                number_of_ordered_stocks[1],
                number_of_ordered_stocks[2],
                number_of_ordered_stocks[3],
                number_of_ordered_stocks[4]
            ),
            stocks(
                number_of_out_for_delivery[1],
                number_of_out_for_delivery[2],
                number_of_out_for_delivery[3],
                number_of_out_for_delivery[4]
            )
        );
    }
}
