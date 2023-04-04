// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IEd3LoyaltyPoints.sol";

contract Ed3AirTicket is ERC20, ERC20Burnable, Ownable {
    uint256 public ticketPrice;
    uint256 public ticketLeft;
    address payable paymentAddress;
    address public ed3LoyaltyPoints;
    uint256 public immutable POINTS_PER_TICKET;
    uint256 public constant ONE_TICKET = 1;

    constructor(
        uint256 _ticketPrice,
        uint256 _totalSupply,
        address _ed3LoyaltyPoints,
        uint256 _pointsPerTicket
    ) ERC20("Ed3AirTicket", "EAT") {
        _mint(msg.sender, _totalSupply);
        ticketLeft = _totalSupply;
        ticketPrice = _ticketPrice;
        paymentAddress = payable(msg.sender);
        ed3LoyaltyPoints = _ed3LoyaltyPoints;
        POINTS_PER_TICKET = _pointsPerTicket;
    }

    function mint(address _to) external payable {
        require(msg.value >= ticketPrice, "Insufficient funds");
        require(ticketLeft > ONE_TICKET, "air ticket sold out");
        ticketLeft = ticketLeft - ONE_TICKET;
        _mint(_to, ONE_TICKET);
        // 每次购买机票后可以得到 POINTS_PER_TICKET 积分
        IEd3LoyaltyPoints(ed3LoyaltyPoints).mint(_to, POINTS_PER_TICKET);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(paymentAddress).transfer(address(this).balance);
    }

    function decimals() public view virtual override returns (uint8) {
        return 1;
    }
}
