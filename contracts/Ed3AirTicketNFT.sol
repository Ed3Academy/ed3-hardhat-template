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
 * @title Ed3航空公司机票NFT
 * ERC721：ERC721是一种以太坊上的智能合约标准，ERC721标准定义了一组接口，包括代币操作（如转移、批准和余额查询）以及一些高级功能（如元数据和事件通知）。
 * ERC721Enumerable：在ERC721标准的基础上增加了枚举功能，允许用户按照索引或者范围查询代币，方便用户进行批量操作。
 * ERC721URIStorage：在ERC721标准的基础上增加了URI存储功能，允许用户将每个代币的元数据（如名称、描述、图像等）存储在一个单独的URI中。
 * ERC721Pausable：，它在ERC721标准的基础上增加了暂停功能，允许用户在必要时暂停代币的转移和批准操作，以避免恶意行为或者系统故障导致的代币损失。
 * ERC721Burnable：在ERC721标准的基础上增加了一些销毁（Burn）功能，允许用户销毁自己拥有的代币。
 */
contract Ed3AirTicketNFT is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, ERC721Burnable {
    // 为代币ID计数器添加了一些计数器操作函数，方便开发者处理代币ID
    using Counters for Counters.Counter;
    // 调用 Strings 库中定义的一些字符串操作函数，而不需要显式地将 uint256 转换为字符串类型，为 tokenId 属性添加了一些字符串操作函数，方便处理代币ID
    using Strings for uint256;

    event BaseURIUpdated(string newBaseURI);
    event PaymentAddressUpdated(address paymentAddress);

    Counters.Counter private tokenIdCounter;

    string public baseUri;
    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public launchDate;
    address payable paymentAddress;

    /**
     * @notice Ed3航空公司机票NFT构造函数
     * @param _name 机票名称
     * @param _symbol 机票symbol
     * @param _baseUri 机票元数据地址
     * @param _mintPrice 机票单价
     * @param _maxSupply 机票发行数量
     * @param _launchDate 机票发行开始实践
     * @param _paymentAddress 机票
     */
    constructor(
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

    // 将机票mint给指定用户，需要使用payable指明此方法是可以接收原生币种
    function mint(address _to) external payable {
        // 校验当前区块时间是否在首发时间之后
        require(block.timestamp >= launchDate, "minting not enabled yet, please wait");
        // 校验当前代币供应量是否达到上限
        require(tokenIdCounter.current() < maxSupply, "Maximum supply reached");
        // 校验用户用于mint的资金是否足够
        require(msg.value >= mintPrice, "Insufficient funds");
        // 获取代币ID
        uint256 tokenId = tokenIdCounter.current();
        // 将指定tokenid的代币mint给用户
        _mint(_to, tokenId);
        // 代币id自增
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

    // 将卖机票收入转移到 paymentAddress
    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");

        payable(paymentAddress).transfer(address(this).balance);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return _baseURI();
        // return bytes(_baseURI()).length > 0 ? string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json")) : "";
    }

    // ERC165接口的一个函数，可以用来检查合约是否实现了指定的标准接口，这些函数包括：
    // 只需传入参数 0x80ac58cd，返回true即可说明当前合约实现了ERC721标准的接口
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
