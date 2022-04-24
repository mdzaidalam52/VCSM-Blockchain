// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Beneficiary.sol";

contract Beneficiaries {
    mapping(uint256 => Beneficiary) public beneficiaries;
    Beneficiary[] public beneficiaryArray;

    struct beneficiaryInfo {
        uint256 vaccine;
        uint256 num_of_doses;
    }

    function createBenefeciary(uint256 _aadhar) public returns (bool) {
        if (address(beneficiaries[_aadhar]) == address(0)) {
            beneficiaries[_aadhar] = new Beneficiary();
            return true;
        } else {
            return false;
        }
    }

    function beneficiaryFirstVaccine(
        uint256 _aadhar,
        uint256 _vaccine,
        address _admin
    ) public returns (bool) {
        if (address(beneficiaries[_aadhar]) == address(0)) {
            return false;
        }
        Beneficiary beneficiary = Beneficiary(beneficiaries[_aadhar]);
        beneficiary.registerFirstVaccine(_admin, _vaccine);
        return true;
    }

    function beneficiarySecondVaccine(uint256 _aadhar, address _admin)
        public
        returns (bool)
    {
        if (address(beneficiaries[_aadhar]) == address(0)) {
            return false;
        }
        Beneficiary beneficiary = Beneficiary(beneficiaries[_aadhar]);
        beneficiary.registerSecondVaccine(_admin);
        return true;
    }

    function getBeneficiaryInfo(uint256 _aadhar) public view returns(beneficiaryInfo memory) {
        if (address(beneficiaries[_aadhar]) == address(0)) {
            return beneficiaryInfo(10, 10);
        }
        Beneficiary ben = beneficiaries[_aadhar];
        return beneficiaryInfo(ben.getVaccineType(), ben.getNumOfDoses());
    }

    function getBeneficiary(uint256 _aadhar) public view returns (Beneficiary) {
        return beneficiaries[_aadhar];
    }
}
