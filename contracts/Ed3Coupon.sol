// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title Ed3航空公司优惠券NFT
 */
contract Ed3Coupon is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, ERC721Burnable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    event BaseURIUpdated(string newBaseURI);
    event PaymentAddressUpdated(address paymentAddress);

    Counters.Counter private tokenIdCounter;

    string public baseUri;
    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public launchDate;
    address payable paymentAddress;
    address public tokenAddress;

    // 在构造函数中需要指明积分合约地址用来校验用户提供的积分是否足够；
    constructor(
        address _tokenAddress,
        string memory _name,
        string memory _symbol,
        string memory _baseUri,
        uint256 _mintPrice,
        uint256 _maxSupply,
        uint256 _launchDate,
        address _paymentAddress
    ) ERC721(_name, _symbol) {
        baseUri = _baseUri;
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        launchDate = _launchDate;
        paymentAddress = payable(_paymentAddress);
        tokenAddress = _tokenAddress;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    function setBaseURI(string memory _baseUri) external virtual onlyOwner {
        _setBaseURI(_baseUri);
    }

    function _setBaseURI(string memory _baseUri) internal virtual {
        baseUri = _baseUri;
        emit BaseURIUpdated(_baseUri);
    }

    function updatePaymentAddress(address payable _paymentAddress) public onlyOwner {
        paymentAddress = _paymentAddress;
        emit PaymentAddressUpdated(_paymentAddress);
    }

    // 将优惠券mint给指定用户，这是使用指定的token才能兑换优惠券，以物易物。指定的token以及兑换数值比例在构造函数中做了指定
    function mint(address _to) public {
        require(block.timestamp >= launchDate, "minting not enabled yet, please wait");
        require(tokenIdCounter.current() < maxSupply, "Maximum supply reached");
        // 校验是否有足够的积分用于兑换
        require(ERC20(tokenAddress).balanceOf(msg.sender) >= mintPrice, "Insufficient funds");
        ERC20(tokenAddress).transferFrom(msg.sender, address(this), mintPrice);
        uint256 tokenId = tokenIdCounter.current();
        _mint(_to, tokenId);
        tokenIdCounter.increment();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function withdraw() external onlyOwner {
        require(ERC20(tokenAddress).balanceOf(address(this)) > 0, "No funds to withdraw");
        ERC20(tokenAddress).transfer(paymentAddress, ERC20(tokenAddress).balanceOf(address(this)));
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI() public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return _baseURI();
        // return bytes(_baseURI()).length > 0 ? string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json")) : "";
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
