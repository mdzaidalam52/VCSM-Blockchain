// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract People{
    
    enum gender{FEMALE, MALE, OTHER}
    struct person{
        string name;
        uint8 date;
        uint8 month;
        uint8 year;
        gender gender;
    }

    address admin;
    mapping(uint256 => person) personInfo;

    constructor(){
        admin = msg.sender;
    }

    function register(uint256 _aadhar, string memory _name, uint8 _d, uint8 _m, uint8 _y, uint8 _gender) public returns(person memory){
        require(personInfo[_aadhar].date == 0, "Already registered");

        gender g = gender.OTHER;
        if(_gender == 0){
            g = gender.FEMALE;
        }else if(_gender == 1){
            g = gender.MALE;
        }
        person memory p = person(_name, _d, _m, _y, g);
        personInfo[_aadhar] = p;
        return p;
    }

    function getUsers(uint256 aadhar) public view returns(person memory){
        return personInfo[aadhar];
    }
}