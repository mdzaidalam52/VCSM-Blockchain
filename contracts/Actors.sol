// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturer.sol";
import "./People.sol";
import "./Admin.sol";
import "./Delivery.sol";

contract Actors {
    address owner;
    mapping(address => Admin) public admins;
    mapping(uint256 => People) public beneficiaries;
    mapping(address => Manufacturer) public manufacturers;
    Admin[] public adminArray;
    People[] public beneficiaryArray;
    Manufacturer[] public manufacturerArray;
    struct adminInfo {
        address owner;
        uint256 center_no;
        uint256 available_a;
        uint256 available_b;
        uint256 available_c;
        uint256 available_d;
    }

    struct beneficiaryInfo {
        uint256 vaccine;
        uint256 num_of_doses;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the Onwer");
        _;
    }

    modifier notManufacturer() {
        require(
            address(manufacturers[msg.sender]) == address(0),
            "Already a manufacturer or admin"
        );
        _;
    }
    modifier notAdmin() {
        require(
            address(admins[msg.sender]) == address(0),
            "Already a manufacturer or admin"
        );
        _;
    }
    modifier noBenefeciary(uint256 _aadhar) {
        require(
            address(beneficiaries[_aadhar]) == address(0),
            "Already a beneficiary"
        );
        _;
    }
    modifier onlyManufacturer() {
        require(
            address(manufacturers[msg.sender]) != address(0),
            "Not a manufacturer"
        );
        _;
    }
    modifier onlyBenefeciary(uint256 _aadhar) {
        require(
            address(beneficiaries[_aadhar]) != address(0),
            "Not a beneficiary"
        );
        _;
    }
    modifier onlyAdmin() {
        require(
            address(admins[msg.sender]) != address(0),
            "Not a manufacturer"
        );
        _;
    }

    function createManufacturer() public notManufacturer {
        manufacturers[msg.sender] = new Manufacturer();
    }

    function createBenefeciary(uint256 _aadhar)
        public
        noBenefeciary(_aadhar)
        returns (address)
    {
        beneficiaries[_aadhar] = new People();
        return address(beneficiaries[_aadhar]);
    }

    function createAdmin() public notAdmin {
        admins[msg.sender] = new Admin();
    }

    function adminCreateOrder(
        uint256 _vaccine,
        uint256 _qty,
        address _manufacturer
    ) public onlyAdmin {
        Admin admin = Admin(msg.sender);
        admin.makeOrder(_vaccine, _qty, _manufacturer);
    }

    function adminVaccinationDone(uint256 _aadhar) public onlyAdmin {
        Admin admin = Admin(msg.sender);
        admin.vaccinationDone(address(beneficiaries[_aadhar]));
    }

    function beneficiaryFirstVaccine(
        uint256 _aadhar,
        uint256 _vaccine,
        address _admin
    ) public onlyBenefeciary(_aadhar) {
        People beneficiary = People(beneficiaries[_aadhar]);
        beneficiary.registerFirstVaccine(_admin, _vaccine);
    }

    function beneficiarySecondVaccine(uint256 _aadhar, address _admin)
        public
        onlyBenefeciary(_aadhar)
        onlyOwner
    {
        People beneficiary = People(beneficiaries[_aadhar]);
        beneficiary.registerSecondVaccine(_admin);
    }

    function manufacturerAddStock(uint256 _vaccine, uint256 _qty)
        public
        onlyManufacturer
    {
        Manufacturer manufacturer = Manufacturer(msg.sender);
        manufacturer.addStocks(_vaccine, _qty);
    }

    function manufacturerCreateDelivery(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public onlyManufacturer {
        Manufacturer manufacturer = Manufacturer(msg.sender);
        manufacturer.createDelivery(vac, qty, _admin);
    }

    function getAllAdmins() public view returns (adminInfo[] memory) {
        adminInfo[] memory arrays = new adminInfo[](adminArray.length);
        for (uint256 i = 0; i < adminArray.length; i++) {
            (
                address add,
                uint256 c_no,
                uint256 a,
                uint256 b,
                uint256 c,
                uint256 d
            ) = adminArray[i].getInfo();
            adminInfo memory info = adminInfo(add, c_no, a, b, c, d);
            arrays[i] = info;
        }
        return arrays;
    }
}
