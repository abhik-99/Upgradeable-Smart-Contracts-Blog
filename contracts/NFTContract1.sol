// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract OurUpgradeableNFT1 is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
	string public greeting;

    function initialize(string calldata _greeting) public initializer {
		greeting = _greeting;
        __UUPSUpgradeable_init();
        __Ownable_init();
	}

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
