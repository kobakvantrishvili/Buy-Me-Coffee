import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";

interface Message {
  from: string;
  timestamp: bigint;
  name: string;
  message: string;
}

// Function to console log all donated balances and respective addresses
async function printBalances(addresses: string[]): Promise<void> {
  for (const address of addresses) {
    const balance = await getUserBalance(address);
    console.log(`Address: ${address}, Balance: ${balance}`);
  }
}

// Function to print all messages contained in the contract
async function printMessages(messages: Message[]): Promise<void> {
  for (const message of messages) {
    console.log(
      `From: ${message.from} (${message.name}), Timestamp: ${message.timestamp}, Message: ${message.message}`
    );
  }
}

// Function to retrieve someone's Ethereum balance
async function getUserBalance(address: string): Promise<bigint> {
  const balance = await ethers.provider.getBalance(address);
  return balance;
}

async function main() {
  // example accounts
  const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

  // contract deployment
  const buyMeACoffeeContract = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await buyMeACoffeeContract.deploy();
  const buyMeACoffeeAddress = await buyMeACoffee.getAddress();
  console.log("BuyMeACoffee deployed to", buyMeACoffeeAddress);

  const addresses = [owner.address, tipper1.address, tipper2.address, tipper3.address, buyMeACoffeeAddress];

  // check balances before coffee purchase
  console.log("== before coffee purchase ==");
  await printBalances(addresses);

  // coffee purchase
  const tip = { value: ethers.parseEther("1") }; // solidity functions have optional array thus the tip argument;
  await buyMeACoffee.connect(tipper1).buyCoffee("tipper1", "iyide yava dzmao", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("tipper2", "iyide yava batono", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("tipper3", "iyide bevri yava", tip);

  // check balances after coffee purchase
  console.log("== after coffee purchase ==");
  await printBalances(addresses);

  // withdraw funds
  await buyMeACoffee.connect(owner).withdrawFunds();

  // check balances after coffee purchase
  console.log("== after fund withdrawal ==");
  await printBalances(addresses);

  // read all the messages
  console.log("== messages ==");
  printMessages(await buyMeACoffee.connect(owner).getMessages());
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
