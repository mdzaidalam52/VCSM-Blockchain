// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Admin.sol";

contract People{
    address public owner;

    uint public vac;
    uint public num_of_doses = 0;

    constructor(){
        owner = msg.sender;
    }

    function registerFirstVaccine(address _admin, uint _vaccine) public {
        require(num_of_doses == 0, "This beneficiary has already have its first dose of vaccine");
        Admin admin = Admin(_admin);
        admin.registerBeneficiaryFirstVaccine(owner, _vaccine);
    }

    function registerSecondVaccine(address _admin) public {
        require(num_of_doses == 1, "This beneficiary has not have its first dose of vaccine");
        Admin admin = Admin(_admin);
        admin.registerBeneficiarySecondVaccine(owner);
    }

    function getNumOfDoses() public view returns(uint){
        return num_of_doses;
    }

    function getVaccineType() public view returns(uint){
        return vac;
    }

    function increaseNumOfDoses() public{
        num_of_doses++;
    }

    function setVaccineType(uint _type) public{
        vac = _type;
    }

}