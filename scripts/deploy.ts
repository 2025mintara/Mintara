import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying MintaraTokenFactory to Base Network...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  const MintaraTokenFactory = await ethers.getContractFactory("MintaraTokenFactory");
  const factory = await MintaraTokenFactory.deploy();

  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();

  console.log("✅ MintaraTokenFactory deployed to:", factoryAddress);
  console.log("\n📋 Add this address to your frontend:");
  console.log(`export const TOKEN_FACTORY_ADDRESS: Address = '${factoryAddress}';`);
  console.log("\n🔍 Verify on BaseScan:");
  console.log(`https://basescan.org/address/${factoryAddress}`);
  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
