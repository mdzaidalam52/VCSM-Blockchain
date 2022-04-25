// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Delivery.sol";
import "./Admins.sol";

contract Manufacturer {
    address public owner;

    uint256 price_a;
    uint256 price_b;
    uint256 price_c;
    uint256 price_d;

    struct stocks {
        uint256 a;
        uint256 b;
        uint256 c;
        uint256 d;
    }

    struct orderInfo {
        uint256 vaccine;
        uint256 qty;
        address admin;
    }

    // mapping(address => mapping(uint256 => uint256)) ordered_stocks;
    orderInfo[] orders;
    uint256 number_of_orders;
    uint256 number_of_deliveries;
    mapping(uint256 => uint256) available_stocks;
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
    ) public returns (bool) {
        if (available_stocks[vac] >= qty) {
            if (orders.length == number_of_orders)
                orders.push(orderInfo(vac, qty, _admin));
            else orders[number_of_orders] = orderInfo(vac, qty, _admin);
            number_of_orders++;
            number_of_ordered_stocks[vac] += qty;
            available_stocks[vac] -= qty;
            return true;
        } else {
            return false;
        }
    }

    function removeOrders(uint256 ind) public {
        for (uint256 i = ind; i < number_of_orders - 1; i++) {
            orders[i] = orders[i + 1];
        }
        delete orders[orders.length - 1];
        number_of_orders--;
    }

    function createDelivery(uint256 ind) public {
        uint256 qty = orders[ind].qty;
        uint256 vac = orders[ind].vaccine;
        address _admin = orders[ind].admin;
        removeOrders(ind);
        Delivery delivery = new Delivery(owner, _admin, vac, qty);
        out_for_delivery[address(delivery)][vac] = qty;
        number_of_out_for_delivery[vac] += qty;
        deliveries.push(delivery);
        number_of_deliveries++;
    }

    function removeDelivery(uint256 ind) public {
        for (uint256 i = ind; i < number_of_deliveries - 1; i++) {
            deliveries[ind] = deliveries[ind + 1];
        }
        delete deliveries[number_of_deliveries - 1];
        number_of_deliveries--;
    }

    function finishDelivery(uint256 ind, Admins admin) public returns (bool) {
        Delivery delivery = deliveries[ind];
        Delivery.deliveryInfo memory info = delivery.getInfo();
        out_for_delivery[address(delivery)][info.vac] -= info.qty;
        number_of_out_for_delivery[info.vac] -= info.qty;
        delivery.orderReached(admin);
        removeDelivery(ind);
        return true;
    }

    function addStocks(uint256 vac, uint256 qty) public {
        available_stocks[vac] += qty;
    }

    function getInfo()
        public
        view
        returns (
            address,
            stocks memory,
            stocks memory,
            stocks memory,
            uint256 a,
            uint256 b,
            uint256 c,
            uint256 d,
            orderInfo[] memory order,
            Delivery.deliveryInfo[] memory delivery
        )
    {
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
            price_d,
            getAllOrders(),
            getAllDeliveries()
        );
    }

    function setPrice(
        uint256 a,
        uint256 b,
        uint256 c,
        uint256 d
    ) public {
        price_a = a;
        price_b = b;
        price_c = c;
        price_d = d;
    }

    function getAllOrders() public view returns (orderInfo[] memory) {
        orderInfo[] memory arr = new orderInfo[](number_of_orders);
        for (uint256 i = 0; i < number_of_orders; i++) {
            arr[i] = orders[i];
        }
        return arr;
    }

    function getAllDeliveries()
        public
        view
        returns (Delivery.deliveryInfo[] memory)
    {
        Delivery.deliveryInfo[] memory arr = new Delivery.deliveryInfo[](
            number_of_deliveries
        );
        for (uint256 i = 0; i < number_of_deliveries; i++) {
            arr[i] = deliveries[i].getInfo();
        }
        return arr;
    }
}
