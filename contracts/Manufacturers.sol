// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";
import "./Delivery.sol";

contract Manufacturers {
    mapping(address => Manufacturer) public manufacturers;
    Manufacturer[] public manufacturerArray;

    struct manufacturerInfo {
        address owner;
        Manufacturer.stocks available;
        Manufacturer.stocks ordered;
        Manufacturer.stocks out_for_delivery;
        uint256 price_a;
        uint256 price_b;
        uint256 price_c;
        uint256 price_d;
        Manufacturer.orderInfo[] manufacturerOrders;
        Delivery.deliveryInfo[] manufacturerDeliveries;
    }

    function createManufacturer(address add) public returns (bool) {
        if (address(manufacturers[add]) != address(0)) {
            return false;
        }
        manufacturers[add] = new Manufacturer(add);
        manufacturerArray.push(manufacturers[add]);
        return true;
    }

    function manufacturerAddStock(
        address add,
        uint256 _vaccine,
        uint256 _qty
    ) public returns (bool) {
        if (address(manufacturers[add]) == address(0)) {
            return false;
        }
        Manufacturer manufacturer = manufacturers[add];
        manufacturer.addStocks(_vaccine, _qty);
        return true;
    }

    function manufacturerCreateDelivery(address add, uint256 ind)
        public
        returns (bool)
    {
        if (address(manufacturers[add]) == address(0)) {
            return false;
        }
        Manufacturer manufacturer = manufacturers[add];
        manufacturer.createDelivery(ind);
        // manufacturer.createDelivery(vac, qty, _admin);
        return true;
    }

    function getAllManufacturers()
        public
        view
        returns (manufacturerInfo[] memory)
    {
        manufacturerInfo[] memory arrays = new manufacturerInfo[](
            manufacturerArray.length
        );
        for (uint256 i = 0; i < manufacturerArray.length; i++) {
            (
                address addr,
                Manufacturer.stocks memory available,
                Manufacturer.stocks memory ordered,
                Manufacturer.stocks memory out_for_delivery,
                uint256 a,
                uint256 b,
                uint256 c,
                uint256 d,
                Manufacturer.orderInfo[] memory manOrder,
                Delivery.deliveryInfo[] memory manDelivery
            ) = manufacturerArray[i].getInfo();
            manufacturerInfo memory info = manufacturerInfo(
                addr,
                available,
                ordered,
                out_for_delivery,
                a,
                b,
                c,
                d,
                manOrder,
                manDelivery
            );
            arrays[i] = info;
        }
        return arrays;
    }

    function manufacturerFinishDelivery(
        address _address,
        uint256 ind,
        Admins admin
    ) public returns (bool) {
        return manufacturers[_address].finishDelivery(ind, admin);
    }

    function getManufacturerInfo(address add)
        public
        view
        returns (manufacturerInfo memory)
    {
        if (address(manufacturers[add]) == address(0)) {
            Manufacturer.orderInfo[] memory arr = new Manufacturer.orderInfo[](
                1
            );
            Delivery.deliveryInfo[] memory ar = new Delivery.deliveryInfo[](1);
            return
                manufacturerInfo(
                    address(0),
                    Manufacturer.stocks(0, 0, 0, 0),
                    Manufacturer.stocks(0, 0, 0, 0),
                    Manufacturer.stocks(0, 0, 0, 0),
                    0,
                    0,
                    0,
                    0,
                    arr,
                    ar
                );
        }
        Manufacturer man = manufacturers[add];
        (
            address addr,
            Manufacturer.stocks memory available,
            Manufacturer.stocks memory ordered,
            Manufacturer.stocks memory out_for_delivery,
            uint256 a,
            uint256 b,
            uint256 c,
            uint256 d,
            Manufacturer.orderInfo[] memory manOrder,
            Delivery.deliveryInfo[] memory manDelivery
        ) = man.getInfo();
        return
            manufacturerInfo(
                addr,
                available,
                ordered,
                out_for_delivery,
                a,
                b,
                c,
                d,
                manOrder,
                manDelivery
            );
    }

    function getManufacturer(address _address)
        public
        view
        returns (Manufacturer)
    {
        return manufacturers[_address];
    }

    function setPrice(
        address _address,
        uint256 a,
        uint256 b,
        uint256 c,
        uint256 d
    ) public {
        return manufacturers[_address].setPrice(a, b, c, d);
    }

    function getAllOrders(address _address)
        public
        view
        returns (Manufacturer.orderInfo[] memory)
    {
        Manufacturer manufacturer = getManufacturer(_address);
        return (manufacturer.getAllOrders());
    }

    function getAllDeliveries(address _address)
        public
        view
        returns (Delivery.deliveryInfo[] memory)
    {
        return manufacturers[_address].getAllDeliveries();
    }
}
