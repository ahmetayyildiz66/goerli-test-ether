// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract GoerliEtherMarket {
  address private _owner;
  uint256 private _receivableEtherAmount;
  uint256 private _balance;

  struct Payment {
    address receiver;
    uint256 date;
    uint256 totalReceivedAmount;
  }

  struct Donate {
    address donor;
    uint256 totalAmountDonated;
  }

  mapping(address => Payment) private _payments;
  mapping(address => Donate) private _donates;

  event ReceivedEther(address indexed receiver, uint256 amount);
  event DonatedEther(address indexed donor, uint256 amount);

  constructor() {
    _owner = msg.sender;
  }

  function setReceivableEtherAmount(uint256 amount_) external onlyOwner {
    _receivableEtherAmount = amount_;
  }

  function receiveEther() external {
    require(_balance > 2 ether, "To receive ether balance must be greater than 2 ether");
    require(_receivableEtherAmount != 0, "Receiable amount must be set");

    uint256 amount = 1 ether / _receivableEtherAmount;

    if (_payments[msg.sender].receiver == address(0)) {
      Payment memory payment = Payment({
        receiver: msg.sender,
        date: block.timestamp,
        totalReceivedAmount: amount
      });
      _payments[msg.sender] = payment;
      _balance -= amount;
      payable(msg.sender).transfer(amount);
    } else {
      Payment storage payment = _payments[msg.sender];
      bool isLessThanOneDay = (block.timestamp - payment.date) < 1 days;
      require(!isLessThanOneDay, "Due to limited resources, REQUESTS to Goerli network are limited to ONCE A DAY.");

      payment.date = block.timestamp;
      _balance -= amount;
      payment.totalReceivedAmount += amount;
      payable(msg.sender).transfer(amount);
    }

    emit ReceivedEther(msg.sender, amount);
  }

  function donateEther() external payable {
    if (_donates[msg.sender].donor == address(0)) {
      Donate memory donate = Donate({
        donor: msg.sender,
        totalAmountDonated: msg.value
      });

      _donates[msg.sender] = donate;
    } else {
      _donates[msg.sender].totalAmountDonated += msg.value;
    }
    _balance += msg.value;

    emit DonatedEther(msg.sender, msg.value);
  }

  function getPayment() external view returns(Payment memory) {
    return _payments[msg.sender];
  }

  function getDonate() external view returns(Donate memory) {
    return _donates[msg.sender];
  }

  function getBalance() external view returns(uint256) {
    return _balance;
  }

  function getReceivableAmount() external view returns(uint256) {
    return _receivableEtherAmount * 1 wei;
  }

  modifier onlyOwner {
    require(msg.sender == _owner, "Only owner can call this method.");
    _;
  }
}