// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";
import "./People.sol";

contract Admin {
    address public owner;

    uint256 centre_no;
    mapping(uint256 => uint256) public available_stock;
    mapping(address => mapping(uint256 => uint256)) public ordered_stocks;
    mapping(address => uint256) public registered_stock;

    uint256 totalVaccines = 0;

    constructor() {
        owner = msg.sender;
    }

    function makeOrder(
        uint256 vac,
        uint256 qty,
        address _manufacturer
    ) public {
        Manufacturer manuf = Manufacturer(_manufacturer);
        manuf.receiveOrder(vac, qty, owner);
        ordered_stocks[_manufacturer][vac] += qty;
    }

    function registerBeneficiaryFirstVaccine(
        address _beneficiary,
        uint256 _vaccine
    ) public {
        require(available_stock[_vaccine] > 0, "Insufficient Stocks");
        available_stock[_vaccine] -= 1;
        totalVaccines -= 1;
        registered_stock[_beneficiary] = _vaccine;
    }

    function registerBeneficiarySecondVaccine(address _beneficiary) public {
        People beneficiary = People(_beneficiary);
        require(
            beneficiary.getNumOfDoses() == 0,
            "This cannot be the beneficiary second vaccine"
        );
        uint256 _vaccine = beneficiary.getVaccineType();
        require(available_stock[_vaccine] > 0, "Insufficient Stocks");
        available_stock[_vaccine] -= 1;
        totalVaccines -= 1;
    }

    function vaccinationDone(address _beneficiary) public {
        People beneficiary = People(_beneficiary);
        beneficiary.increaseNumOfDoses();
        if (beneficiary.getNumOfDoses() == 1)
            beneficiary.setVaccineType(registered_stock[_beneficiary]);
        registered_stock[_beneficiary] = 0;
    }

    function receivedVaccine(
        uint256 _vaccine,
        uint256 qty,
        address _manufacturer
    ) public {
        require(
            ordered_stocks[_manufacturer][_vaccine] != 0,
            "No order had been placed with this manufacturer"
        );
        require(
            ordered_stocks[_manufacturer][_vaccine] >= qty,
            "More than ordered vaccines has been received"
        );

        available_stock[_vaccine] += qty;
        totalVaccines += qty;
        ordered_stocks[_manufacturer][_vaccine] -= qty;
    }
}
