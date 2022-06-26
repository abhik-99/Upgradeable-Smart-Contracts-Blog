// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "./NFTContract1.sol";

contract OurUpgradeableNFT2 is OurUpgradeableNFT1, ERC721URIStorageUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    function reInitialize() public reinitializer(2) {
        __ERC721_init("OurUpgradeableNFT", "OUN");
        __ERC721URIStorage_init();
    }

    function greetingNew() public pure returns (string memory) {
        return "New Upgradeable World!";
    }

    function safeMint(address to, string memory uri) public virtual onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
