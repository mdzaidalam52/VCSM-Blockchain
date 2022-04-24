// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";
import "./Beneficiary.sol";

contract Admin {
    address public owner;

    uint256 centre_no;
    mapping(uint256 => uint256) public available_stock;
    mapping(address => mapping(uint256 => uint256)) public ordered_stocks;
    mapping(address => uint256) public registered_stock;
    mapping(uint256 => uint256) public number_of_ordered_stocks;
    mapping(uint256 => uint256) public number_of_registered_stocks;
    struct stocks {
        uint256 a;
        uint256 b;
        uint256 c;
        uint256 d;
    }

    uint256 totalVaccines = 0;

    constructor(uint256 n, address add) {
        owner = add;
        centre_no = n;
    }

    function makeOrder(
        uint256 vac,
        uint256 qty,
        address _manufacturer
    ) public {
        Manufacturer manuf = Manufacturer(_manufacturer);
        manuf.receiveOrder(vac, qty, owner);
        ordered_stocks[_manufacturer][vac] += qty;
        number_of_ordered_stocks[vac] += qty;
    }

    function registerBeneficiaryFirstVaccine(
        address _beneficiary,
        uint256 _vaccine
    ) public {
        require(available_stock[_vaccine] > 0, "Insufficient Stocks");
        available_stock[_vaccine] -= 1;
        totalVaccines -= 1;
        registered_stock[_beneficiary] = _vaccine;
        number_of_registered_stocks[_vaccine]++;
    }

    function registerBeneficiarySecondVaccine(address _beneficiary) public {
        Beneficiary beneficiary = Beneficiary(_beneficiary);
        require(
            beneficiary.getNumOfDoses() == 0,
            "This cannot be the beneficiary second vaccine"
        );
        uint256 _vaccine = beneficiary.getVaccineType();
        require(available_stock[_vaccine] > 0, "Insufficient Stocks");
        available_stock[_vaccine] -= 1;
        totalVaccines -= 1;
        number_of_registered_stocks[_vaccine]++;
    }

    function vaccinationDone(address _beneficiary) public {
        Beneficiary beneficiary = Beneficiary(_beneficiary);
        beneficiary.increaseNumOfDoses();
        if (beneficiary.getNumOfDoses() == 1)
            beneficiary.setVaccineType(registered_stock[_beneficiary]);
        registered_stock[_beneficiary] = 0;
        number_of_registered_stocks[beneficiary.getVaccineType()]--;
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
        number_of_ordered_stocks[_vaccine] -= qty;
    }

    function getInfo()
        public
        view
        returns (
            address,
            uint256,
            stocks memory,
            stocks memory,
            stocks memory
        )
    {
        return (
            owner,
            centre_no,
            stocks(
                available_stock[1],
                available_stock[2],
                available_stock[3],
                available_stock[4]
            ),
            stocks(
                number_of_ordered_stocks[1],
                number_of_ordered_stocks[2],
                number_of_ordered_stocks[3],
                number_of_ordered_stocks[4]
            ),
            stocks(
                number_of_registered_stocks[1],
                number_of_registered_stocks[2],
                number_of_registered_stocks[3],
                number_of_registered_stocks[4]
            )
        );
    }
}
