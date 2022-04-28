// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Admin.sol";

contract Beneficiary {
    address public owner;

    uint256 public vac;
    uint256 public num_of_doses = 0;
    uint256 registeredAdmin;

    constructor() {
        owner = msg.sender;
    }

    function registerFirstVaccine(
        Admin _admin,
        uint256 _vaccine,
        uint256 _aadhar
    ) public {
        require(
            num_of_doses == 0,
            "This beneficiary has already have its first dose of vaccine"
        );
        _admin.registerBeneficiaryFirstVaccine(_aadhar, _vaccine);
        registeredAdmin = _admin.getCenterNo();
    }

    function registerSecondVaccine(uint _aadhar, Admin _admin) public {
        require(
            num_of_doses == 1,
            "This beneficiary has not have its first dose of vaccine"
        );
        _admin.registerBeneficiarySecondVaccine(_aadhar, vac);
    }

    function getNumOfDoses() public view returns (uint256) {
        return num_of_doses;
    }

    function getVaccineType() public view returns (uint256) {
        return vac;
    }

    function increaseNumOfDoses() public {
        num_of_doses++;
    }

    function setVaccineType(uint256 _type) public {
        vac = _type;
    }

    function getRegisteredAdmin() public view returns(uint){
        return registeredAdmin;
    }

    function setAdmin(uint val) public{
        registeredAdmin = val;
    }
}
