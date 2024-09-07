// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BuyMeACoffee{
    struct Message{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    address payable owner;
    Message[] messages;
    
    event newMessage(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) payable public {
        require(msg.value > 0, "can't buy a coffee with 0 eth!");

        messages.push(Message(msg.sender, block.timestamp, _name, _message));

        // emit a log when new message is created;
        emit newMessage(msg.sender, block.timestamp, _name, _message);
    }

    function withdrawFunds() onlyOwner public{
        require(address(this).balance > 0, "no funds to withdraw!");
        owner.transfer(address(this).balance);
    }

    function getMessages() public view returns(Message[] memory){
        return messages;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }
    
}