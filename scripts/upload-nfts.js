const { NFTStorage, File } = require("nft.storage");
const fs = require("fs-extra");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.NFT_STORAGE_API_KEY;

if (!apiKey) {
  throw new Error("Missing environment variable NFT_STORAGE_API_KEY");
}

const client = new NFTStorage({ token: apiKey });

function readDirectory(dir) {
  const names = fs.readdirSync(dir);
  return names.map((name) => new File([fs.readFileSync(path.join(dir, name))], name));
}
// npx hardhat run ./scripts/upload-nfts.js
async function main() {
  // ticket和coupon都是使用相同的上传脚本，我们在这里切换想要上传的NFT图片是ticket还是coupon
  const pathName = "ticket";
  // const pathName = "coupon";
  const images = readDirectory(path.join(__dirname, "../nfts/images/" + pathName));
  // 将图片上传到ipfs上
  const imageMetadata = await client.storeDirectory(images);
  console.log("Images uploaded to: ", imageMetadata);
  const nftFiles = readDirectory(path.join(__dirname, "../nfts/metadata/" + pathName));
  const nftFilesModified = await Promise.all(
    nftFiles.map(async (file) => {
      const obj = JSON.parse(await file.text());
      obj;
      obj.image = `ipfs://${imageMetadata.toString()}/${obj.image}`;
      return new File([JSON.stringify(obj)], file.name);
    }),
  );
  // 将元数据上传到ipfs上
  const fileMetadata = await client.storeDirectory(nftFilesModified);
  console.log("Metadata uploaded to: https://ipfs.io/ipfs/", fileMetadata);
  // 将元数据保存到本地
  const locationPath = path.join(__dirname, "../nfts/location/" + pathName + "/location.json");
  fs.writeFileSync(
    locationPath,
    JSON.stringify(
      {
        images: imageMetadata.toString(),
        metadata: fileMetadata.toString(),
        count: nftFiles.length,
      },
      null,
      2,
    ),
  );
  console.log("NFT locations saved to: ", locationPath);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
