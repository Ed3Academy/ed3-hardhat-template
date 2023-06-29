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

    // 在机票合约的构造方法中设定：兑换优惠券指定接收的积分地址、优惠券名称、优惠券symbol、元数据地址、单价、供应量上限、发行时间、获得积分收入的地址
    //请在此处编写代码
    /********** Begin **********/
    constructor(
        address _tokenAddress,
        string memory _name,
        string memory _symbol,
        string memory _baseUri,
        uint256 _mintPrice,
        uint256 _maxSupply,
        uint256 _launchDate,
        address _paymentAddress
    ) ERC721(_name, _symbol) {}

    /********** End **********/

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

    function mint(address _to) public {
        // 2.在优惠券合约mint方法中使用修饰器校验条件：优惠券发行时间、供应量是否超过上限、兑换携带的积分是否达到优惠券单价
        //请在此处编写代码
        /********** Begin **********/
        // 校验当前区块时间是否在首发时间之后
        // 校验当前代币供应量是否达到上限
        // 校验兑换携带的积分是否达到优惠券单价
        /********** End **********/
        //3.在优惠券合约mint方法中通过TokenIdCounter保障每一个Token的id唯一、保障mint数量不超过优惠券供应量上限，同时将积分转移到优惠券合约账户中
        //请在此处编写代码
        /********** Begin **********/
        /********** End **********/
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

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return _baseURI();
        // return bytes(_baseURI()).length > 0 ? string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json")) : "";
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
