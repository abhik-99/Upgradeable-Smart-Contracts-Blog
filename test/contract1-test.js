const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Contract Version 1 test", function () {
  it("Should return the greeting after deployment", async function () {
    const OurUpgradeableNFT1 = await ethers.getContractFactory("OurUpgradeableNFT1");

    const contract = await upgrades.deployProxy(OurUpgradeableNFT1, ["Hello, upgradeable world!"], { initializer: 'initialize'});
    await contract.deployed();

    expect(await contract.greeting()).to.equal("Hello, upgradeable world!");
  });
});
