// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Delivery.sol";

contract Manufacturer {
    address public owner;

    uint price_a;
    uint price_b;
    uint price_c;
    uint price_d;

    struct stocks{
        uint a;
        uint b;
        uint c;
        uint d;
    }

    mapping(address => mapping(uint256 => uint256)) ordered_stocks;
    mapping(uint256 => uint) available_stocks;
    mapping(address => mapping(uint256 => uint256)) out_for_delivery;    
    mapping(uint256 => uint256) public number_of_ordered_stocks;
    mapping(uint256 => uint256) public number_of_out_for_delivery;
    Delivery[] deliveries;

    constructor(address add) {
        owner = add;
    }

    function receiveOrder(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public returns(bool){
        if(available_stocks[vac] >= qty){
            ordered_stocks[_admin][vac] += qty;
            number_of_ordered_stocks[vac] += qty;
            available_stocks[vac] -= qty;
            return true;
        }else{
            return false;
        }
    }

    function createDelivery(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public {
        require(ordered_stocks[_admin][vac] >= qty, "Order placed is less");
        ordered_stocks[_admin][vac] -= qty;
        number_of_ordered_stocks[vac] -= qty;
        Delivery delivery = new Delivery(owner, _admin, vac, qty);
        out_for_delivery[address(delivery)][vac] = qty;
        number_of_out_for_delivery[vac] += qty;
        deliveries.push(delivery);
    }

    function finishDelivery(
        address delivery,
        uint256 vac,
        uint256 qty
    ) public {
        out_for_delivery[delivery][vac] -= qty;
        number_of_out_for_delivery[vac] -= qty;
    }

    function addStocks(uint256 vac, uint256 qty) public {
        available_stocks[vac] += qty;
    }

    function getInfo() public view returns(address, stocks memory, stocks memory, stocks memory, uint a, uint b, uint c, uint d){
        return (
            owner,
            stocks(
                available_stocks[1],
                available_stocks[2],
                available_stocks[3],
                available_stocks[4]
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
            ),
            price_a,
            price_b,
            price_c,
            price_d

        );
    }

    function getAllDeliveries() public view returns(Delivery[] memory){
        return deliveries;
    }

    function setPrice(uint a, uint b, uint c, uint d) public {
        price_a = a;
        price_b = b;
        price_c = c;
        price_d = d;
    }
}
