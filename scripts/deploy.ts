import { ethers } from "hardhat";

async function main() {
  const buyMeACoffeeContract = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await buyMeACoffeeContract.deploy();
  await buyMeACoffee.waitForDeployment();
  const buyMeACoffeeAddress = await buyMeACoffee.getAddress();
  console.log("BuyMeACoffee deployed to", buyMeACoffeeAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
