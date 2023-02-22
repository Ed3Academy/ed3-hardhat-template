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

async function main() {
  const images = readDirectory(path.join(__dirname, "../nfts/images"));
  const imageMetadata = await client.storeDirectory(images);
  console.log("Images uploaded to: ", imageMetadata);

  const nftFiles = readDirectory(path.join(__dirname, "../nfts/metadata"));
  const nftFilesModified = await Promise.all(
    nftFiles.map(async (file) => {
      const obj = JSON.parse(await file.text());
      obj;
      obj.image = `ipfs://${imageMetadata.toString()}/${obj.image}`;
      return new File([JSON.stringify(obj)], file.name);
    }),
  );
  const fileMetadata = await client.storeDirectory(nftFilesModified);
  console.log("Metadata uploaded to: ", fileMetadata);

  const locationPath = path.join(__dirname, "../nfts/location.json");
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
