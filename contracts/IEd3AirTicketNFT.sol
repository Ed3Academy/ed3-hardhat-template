// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEd3AirTicketNFT {
    function mint(address _to) external payable;

    function maxSupply() external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function mintPrice() external view returns (uint256);
}
