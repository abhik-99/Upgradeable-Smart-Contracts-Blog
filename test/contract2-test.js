const { expect, assert } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Contract Version 2 test", function () {
  let oldContract, upgradedContract, owner, addr1;
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners(2);
    const OurUpgradeableNFT1 = await ethers.getContractFactory("OurUpgradeableNFT1");
    const OurUpgradeableNFT2 = await ethers.getContractFactory("OurUpgradeableNFT2");

    oldContract = await upgrades.deployProxy(OurUpgradeableNFT1, ["Hello, upgradeable world!"], { initializer: 'initialize', kind: 'uups'});
    
    await oldContract.deployed();
    
    upgradedContract = await upgrades.upgradeProxy(oldContract, OurUpgradeableNFT2, {call: {fn: 'reInitialize'}});
    
  });

  it("Old contract should return old greeting", async function () {
    expect(await oldContract.greeting()).to.equal("Hello, upgradeable world!");
  });

  it("Old contract cannnot mint NFTs", async function () {
    try {
      oldContract.safeMint(owner.address, "Test NFT")
    } catch (error) {
      assert(error.message === "oldContract.safeMint is not a function" )
    }
  })

  it("New Contract Should return the old & new greeting and token name after deployment", async function() {
    expect(await upgradedContract.greeting()).to.equal("Hello, upgradeable world!");
    expect(await upgradedContract.greetingNew()).to.equal("New Upgradeable World!");
    expect(await upgradedContract.name()).to.equal("OurUpgradeableNFT")
  });

  it("Owner can mint NFTs from the upgraded smart contract", async function () {
    await expect(upgradedContract.safeMint(owner.address, "Test NFT"))
    .to.emit(upgradedContract, "Transfer")
    .withArgs(ethers.constants.AddressZero, owner.address, 0);

    expect(await upgradedContract.balanceOf(owner.address)).to.equal(1);
    expect(await upgradedContract.ownerOf(0)).to.equal(owner.address);
  });

  it("Only Owner can mint NFTs", async function () {
    await expect(upgradedContract.connect(addr1).safeMint(addr1.address, "Test NFT 2"))
    .to.be.revertedWith("Ownable: caller is not the owner");
  })
});
