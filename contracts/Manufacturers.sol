// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";

contract Manufacturers {
    mapping(address => Manufacturer) public manufacturers;
    Manufacturer[] public manufacturerArray;

    struct manufacturerInfo {
        address owner;
        Manufacturer.stocks available;
        Manufacturer.stocks ordered;
        Manufacturer.stocks out_for_delivery;
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

    function manufacturerCreateDelivery(
        address add,
        uint256 vac,
        uint256 qty,
        address _admin
    ) public returns (bool) {
        if (address(manufacturers[add]) == address(0)) {
            return false;
        }
        Manufacturer manufacturer = manufacturers[add];
        manufacturer.createDelivery(vac, qty, _admin);
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
                Manufacturer.stocks memory out_for_delivery
            ) = manufacturerArray[i].getInfo();
            manufacturerInfo memory info = manufacturerInfo(
                addr,
                available,
                ordered,
                out_for_delivery
            );
            arrays[i] = info;
        }
        return arrays;
    }

    function getManufacturerInfo(address add)
        public
        view
        returns (manufacturerInfo memory)
    {
        if (address(manufacturers[add]) == address(0)) {
            return
                manufacturerInfo(
                    address(0),
                    Manufacturer.stocks(0, 0, 0, 0),
                    Manufacturer.stocks(0, 0, 0, 0),
                    Manufacturer.stocks(0, 0, 0, 0)
                );
        }
        Manufacturer man = manufacturers[add];
        (
            address addr,
            Manufacturer.stocks memory available,
            Manufacturer.stocks memory ordered,
            Manufacturer.stocks memory out_for_delivery
        ) = man.getInfo();
        return manufacturerInfo(addr, available, ordered, out_for_delivery);
    }
}
