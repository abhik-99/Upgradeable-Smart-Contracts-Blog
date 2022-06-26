const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Contract Version 2 test", function () {
  let contract;
  beforeEach(async function () {
    const OurUpgradeableNFT1 = await ethers.getContractFactory("OurUpgradeableNFT1");
    const OurUpgradeableNFT2 = await ethers.getContractFactory("OurUpgradeableNFT2");

    contract = await upgrades.deployProxy(OurUpgradeableNFT1, ["Hello, upgradeable world!"], { initializer: 'initialize', kind: 'uups'});
    
    await contract.deployed();
    
    contract = await upgrades.upgradeProxy(contract, OurUpgradeableNFT2, {call: {fn: 'reInitialize'}});
    
  });

  it("Should still return the old & new greeting and token name after deployment", async function() {
    expect(await contract.greeting()).to.equal("Hello, upgradeable world!");
    expect(await contract.greetingNew()).to.equal("New Upgradeable World!");
    expect(await contract.name()).to.equal("OurUpgradeableNFT")
  });
});
