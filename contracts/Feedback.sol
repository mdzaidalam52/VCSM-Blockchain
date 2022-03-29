// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Feedback {
    mapping(uint256 => string) feedbacks;

    constructor() {}

    function saveFeedback(uint256 _aadhar, string memory _feed) public {
        feedbacks[_aadhar] = _feed;
    }

    function getFeedback(uint256 _aadhar) public view returns (string memory) {
        return feedbacks[_aadhar];
    }
}
