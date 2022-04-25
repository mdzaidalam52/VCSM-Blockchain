// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./Admin.sol";
import "./Manufacturer.sol";

contract Admins {
    uint256 admin_center = 1;
    mapping(address => Admin) public admins;
    Admin[] public adminArray;

    struct adminInfo {
        address owner;
        uint256 center_no;
        Admin.stocks available;
        Admin.stocks ordered;
        Admin.stocks registered;
    }

    function createAdmin(address add) public returns (bool) {
        if (address(admins[add]) != address(0)) {
            return false;
        }
        admins[add] = new Admin(admin_center, add);
        admin_center++;
        adminArray.push(admins[add]);
        return true;
    }

    function adminCreateOrder(
        address add,
        uint256 _vaccine,
        uint256 _qty,
        Manufacturer _manufacturer
    ) public returns (bool) {
        if (address(admins[add]) == address(0)) {
            return false;
        }
        Admin admin = admins[add];
        if (admin.makeOrder(_vaccine, _qty, _manufacturer)) return true;
        return false;
    }

    function adminVaccinationDone(address add, uint _aadhar, Beneficiary beneficiary)
        public
        returns (bool)
    {
        if (address(admins[add]) == address(0)) {
            return false;
        }
        Admin admin = admins[add];
        admin.vaccinationDone(_aadhar, beneficiary);
        return true;
    }

    function getAllAdmins() public view returns (adminInfo[] memory) {
        adminInfo[] memory arrays = new adminInfo[](adminArray.length);
        for (uint256 i = 0; i < adminArray.length; i++) {
            (
                address add,
                uint256 c_no,
                Admin.stocks memory available,
                Admin.stocks memory ordered,
                Admin.stocks memory registered
            ) = adminArray[i].getInfo();
            adminInfo memory info = adminInfo(
                add,
                c_no,
                available,
                ordered,
                registered
            );
            arrays[i] = info;
        }
        return arrays;
    }

    function getAdminInfo(address add) public view returns (adminInfo memory) {
        if (address(admins[add]) == address(0)) {
            return
                adminInfo(
                    address(0),
                    0,
                    Admin.stocks(0, 0, 0, 0),
                    Admin.stocks(0, 0, 0, 0),
                    Admin.stocks(0, 0, 0, 0)
                );
        }
        Admin admin = admins[add];
        (
            address addr,
            uint256 center,
            Admin.stocks memory available,
            Admin.stocks memory ordered,
            Admin.stocks memory registered
        ) = admin.getInfo();
        return adminInfo(addr, center, available, ordered, registered);
    }

    function getAdmin(address _address) public view returns(Admin){
        return admins[_address];
    }
}
