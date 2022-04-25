// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

import "./Admin.sol";
import "./Admins.sol";

contract Delivery {
    struct deliveryInfo {
        uint256 vac;
        uint256 qty;
        address _admin;
    }
    address from;
    address to;
    uint256 vaccine;
    uint256 qty;
    string location;
    uint256 temp;
    bool open = true;
    uint256 humidity;

    constructor(
        address _from,
        address _to,
        uint256 _vaccine,
        uint256 _qty
    ) {
        from = _from;
        to = _to;
        vaccine = _vaccine;
        qty = _qty;
    }

    function locationUpdate(string memory _location) public {
        location = _location;
    }

    function humidityUpdate(uint256 _humidity) public {
        humidity = _humidity;
    }

    function tempUpdate(uint256 _temp) public {
        temp = _temp;
    }

    function openUpdate() public {
        open = !open;
    }

    function orderReached(Admins _admins) public {
        Admin admin = _admins.getAdmin(to);
        admin.receivedVaccine(vaccine, qty, from);
    }

    function getInfo() public view returns(deliveryInfo memory){
        return deliveryInfo(vaccine, qty, to);
    }
}
