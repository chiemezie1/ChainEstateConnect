const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  
  const _RealEstateProperty = await hre.ethers.getContractFactory("RealEstateProperty");
  const RealEstateProperty = await _RealEstateProperty.deploy();

  await RealEstateProperty.deployed(); 

  console.log("RealEstateProperty deployed to:", RealEstateProperty.address);

  const data = {
    address: RealEstateProperty.address,
    abi: JSON.parse(RealEstateProperty.interface.format('json'))
  };

  //This writes the ABI and address to the eRealEstateProperty.json
  fs.writeFileSync('../client/src/Contract/RealEstateProperty.json', JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
