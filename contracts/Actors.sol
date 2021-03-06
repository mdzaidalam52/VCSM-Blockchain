// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";
import "./People.sol";
import "./Admin.sol";
import "./Delivery.sol";

contract Actors{
    address owner;
    uint hashDigits = 12;
	uint hashModulus = 10 ** hashDigits;
    mapping (address => Admin) public admins;
    mapping (uint => People) public beneficiaries;
    mapping (address => Manufacturer) public manufacturers;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Not the Onwer");
        _;
    }

    modifier notRegistered(){
        require(address(manufacturers[msg.sender]) == address(0) && address(admins[msg.sender]) == address(0), "Already a manufacturer or admin");
        _;
    }
    modifier noBenefeciary(uint _aadhar){
        require(address(beneficiaries[_aadhar]) == address(0) && msg.sender == owner, "Already a beneficiary");
        _;
    }
    modifier onlyManufacturer(){
        require(address(manufacturers[msg.sender]) != address(0), "Not a manufacturer");
        _;
    }
    modifier onlyBenefeciary(uint _aadhar){
        require(address(beneficiaries[_aadhar]) != address(0) && msg.sender == owner, "Not a beneficiary");
        _;
    }
    modifier onlyAdmin(){
        require(address(admins[msg.sender]) != address(0), "Not a manufacturer");
        _;
    }    

    function createManufacturer() public notRegistered{
        manufacturers[msg.sender] = new Manufacturer();
    }

    function generateRandomhash(uint _aadhar) public view returns (uint)
	{
		uint random = uint(keccak256(abi.encodePacked(_aadhar)));
		return random % hashModulus;
	}

    function createBenefeciary(uint _aadhar) public noBenefeciary(_aadhar){        
        beneficiaries[_aadhar] = new People();
        hashed_Aadhar = generateRandomhash(_aadhar);
    }

    function createAdmin() public notRegistered{
        admins[msg.sender] = new Admin();
    }

    function adminCreateOrder(uint _vaccine, uint _qty, address _manufacturer) public onlyAdmin{
        Admin admin = Admin(msg.sender);
        admin.makeOrder(_vaccine, _qty, _manufacturer);
    }

    function adminVaccinationDone(uint _aadhar) public onlyAdmin{
        Admin admin = Admin(msg.sender);
        admin.vaccinationDone(address(beneficiaries[_aadhar]));
    }

    function beneficiaryFirstVaccine(uint _aadhar, uint _vaccine, address _admin) public onlyBenefeciary(_aadhar){
        People beneficiary = People(beneficiaries[_aadhar]);
        beneficiary.registerFirstVaccine(_admin, _vaccine);
    }

    function beneficiarySecondVaccine(uint _aadhar, address _admin) public onlyBenefeciary(_aadhar) onlyOwner{
        People beneficiary = People(beneficiaries[_aadhar]);
        beneficiary.registerSecondVaccine(_admin);
    }

    function manufacturerAddStock(uint _vaccine, uint _qty) public onlyManufacturer{
        Manufacturer manufacturer = Manufacturer(msg.sender);
        manufacturer.addStocks(_vaccine, _qty);
    }

    function manufacturerCreateDelivery(uint vac, uint qty, address _admin) public onlyManufacturer{
        Manufacturer manufacturer = Manufacturer(msg.sender);
        manufacturer.createDelivery(vac, qty, _admin);
    }
}