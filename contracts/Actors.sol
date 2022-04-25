// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Manufacturers.sol";
import "./Beneficiaries.sol";
import "./Admins.sol";
import "./Delivery.sol";

contract Actors {
    Manufacturers manufacturer;
    Admins admin;
    Beneficiaries beneficiary;
    address owner;

    event Success(bool success);
    event Address(address add);
    event BeneficiaryInfo(Beneficiaries.beneficiaryInfo info);
    event AllAdminsInfo(Admins.adminInfo[] arr);
    event AdminInfo(Admins.adminInfo info);
    event AllManufacturersInfo(Manufacturers.manufacturerInfo[] arr);
    event ManufacturerInfo(Manufacturers.manufacturerInfo info);
    event AllDeliveries(Delivery[] deliveries);
    event AllOrders();

    constructor() {
        owner = msg.sender;
        manufacturer = new Manufacturers();
        admin = new Admins();
        beneficiary = new Beneficiaries();
    }

    function createManufacturer() public {
        emit Success(manufacturer.createManufacturer(msg.sender));
    }

    function createBenefeciary(uint256 _aadhar) public {
        emit Success(beneficiary.createBenefeciary(_aadhar));
    }

    function createAdmin() public {
        emit Success(admin.createAdmin(msg.sender));
    }

    function adminCreateOrder(
        uint256 _vaccine,
        uint256 _qty,
        address _manufacturer
    ) public {
        emit Success(
            admin.adminCreateOrder(
                msg.sender,
                _vaccine,
                _qty,
                manufacturer.getManufacturer(_manufacturer)
            )
        );
    }

    function adminVaccinationDone(uint256 _aadhar) public {
        emit Success(
            admin.adminVaccinationDone(
                msg.sender,
                _aadhar,
                beneficiary.getBeneficiary(_aadhar)
            )
        );
    }

    function beneficiaryFirstVaccine(
        uint256 _aadhar,
        uint256 _vaccine,
        address _admin
    ) public {
        emit Success(
            beneficiary.beneficiaryFirstVaccine(
                _aadhar,
                _vaccine,
                admin.getAdmin(_admin)
            )
        );
    }

    function beneficiarySecondVaccine(uint256 _aadhar, address _admin) public {
        emit Success(
            beneficiary.beneficiarySecondVaccine(
                _aadhar,
                admin.getAdmin(_admin)
            )
        );
    }

    function manufacturerAddStock(uint256 _vaccine, uint256 _qty) public {
        emit Success(
            manufacturer.manufacturerAddStock(msg.sender, _vaccine, _qty)
        );
    }

    function manufacturerCreateDelivery(
        uint256 vac,
        uint256 qty,
        address _admin
    ) public {
        emit Success(
            manufacturer.manufacturerCreateDelivery(
                msg.sender,
                vac,
                qty,
                _admin
            )
        );
    }

    function getAllAdmins() public {
        emit AllAdminsInfo(admin.getAllAdmins());
    }

    function getAllManufacturers() public {
        emit AllManufacturersInfo(manufacturer.getAllManufacturers());
    }

    function getBeneficiaryInfo(uint256 _aadhar) public {
        emit BeneficiaryInfo(beneficiary.getBeneficiaryInfo(_aadhar));
    }

    function getAdminInfo() public {
        emit AdminInfo(admin.getAdminInfo(msg.sender));
    }

    function getManufacturerInfo() public {
        emit ManufacturerInfo(manufacturer.getManufacturerInfo(msg.sender));
    }

    function getAllDeliveries() public {
        emit AllDeliveries(manufacturer.getAllDeliveries(msg.sender));
    }

    function manufacturerSetPrice(uint a, uint b, uint c, uint d) public{
        manufacturer.setPrice(msg.sender, a, b, c, d);
    }
}
