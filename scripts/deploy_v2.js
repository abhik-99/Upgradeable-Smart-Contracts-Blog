const { ethers, upgrades } = require("hardhat");

const PROXY_ADDRESS = "0xD1a7c6f15ecC1ceD1219CDa8F556026ADB2063ad"; //Address of version 1
const VERSION1 = "0x35C9fC0433A007E85E1df9339916F703D2c7512F"; //Address of the version 1 implementation
const VERSION2 = "0xab73DAebF460A46556B7B98A3B3BFC1FEC47e8cd"; //Address of version 2 implementation

async function main() {
  const Contract = await ethers.getContractFactory("OurUpgradeableNFT2");
  await upgrades.upgradeProxy(
    PROXY_ADDRESS,
    Contract,
    {
      call: {fn: 'reInitialize'},
      kind: "uups"
    }
    );
  console.log("Version 2 deployed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
