// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IEd3LoyaltyPoints.sol";

contract Ed3AirlineGateV0 is Ownable {
    uint256 public ticketTotalSupply;
    uint256 public ticketPrice;
    uint256 public ticketLeft;
    address payable paymentAddress;
    address public ed3LoyaltyPoints;
    uint256 public immutable POINTS_PER_TICKET;
    uint256 public constant ONE_TICKET = 1;
    mapping(address => uint256) public userTickets;

    constructor(uint256 _ticketPrice, uint256 _totalSupply, address _ed3LoyaltyPoints, uint256 _pointsPerTicket) {
        ticketPrice = _ticketPrice;
        ticketLeft = _totalSupply;
        ticketTotalSupply = _totalSupply;
        ed3LoyaltyPoints = _ed3LoyaltyPoints;
        POINTS_PER_TICKET = _pointsPerTicket;
        paymentAddress = payable(msg.sender);
    }

    function mint(address _to) external payable {
        require(msg.value >= ticketPrice, "Insufficient funds");
        require(ticketLeft > ONE_TICKET, "air ticket sold out");
        ticketLeft = ticketLeft - ONE_TICKET;
        userTickets[msg.sender] = userTickets[msg.sender] + ONE_TICKET;
        // 每次购买机票后可以得到 POINTS_PER_TICKET 积分
        IEd3LoyaltyPoints(ed3LoyaltyPoints).mint(_to, POINTS_PER_TICKET);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(paymentAddress).transfer(address(this).balance);
    }
}
