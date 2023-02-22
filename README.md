# ✏️Ed3Academy 之 Solidity 入门开发课程 👷

## 🚧 在 Polygon Mumbai 网络上部署 MTK

💚 测试命令：

```
npx hardhat test ./test/MyToken.js
```

## ⚡ 在 Polygon Mumbai 网络上部署 NFT

🔥 上传图片到 IPFS 服务：

```
npx hardhat run ./scripts/upload-nfts.js
```

✒️ 使用 MTK 币 mint 出自定义 NFT

🚀 测试命令：

```
npx hardhat test ./test/mintNFTbyMTK.js
```

✅ 在 Polygon Mumbai 上部署 NFT

```
npx hardhat run ./scripts/deployNFTbyMTK.js --network PolygonMumbai
```

## ✨ 使用 MTK mint NFT

- 在 **[mumbai 网络](https://mumbai.polygonscan.com/)** mint MTK

![1677049582677](image/README/mintMTK.png)

- 授权 MTK 额度给 NFT 合约

![1677049703796](image/README/approveMTK.png)

- 在 NFT 合约中 mint 出 NFT

![1677049771855](image/README/mintNFT.png)

## 🎉 查看 NFT

在 OpenSea 上查看 mint 出的 NFT

![1677049912212](image/README/opensea.png)
