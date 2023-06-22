// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./DojoArt.sol";

// ERC-721 Sub-contract: DojoArtPacks
contract DojoArtPacks is ERC721, AccessControl {
    using Strings for uint256;

    address mainContract;
    uint256 tokenPackId = 1;
    mapping(uint256 => uint256[]) private packContents;

    constructor(address _mainContract) ERC721("DojoArtPacks", "DOJOARTPACKS") {
        mainContract = _mainContract;
        _setupRole(DEFAULT_ADMIN_ROLE, _mainContract);
    }

    function mintPack(address to, uint256[] memory tokenIds) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized access");

        uint256 packId = tokenPackId;
        _mint(to, packId);
        packContents[packId] = tokenIds;

        tokenPackId++;
    }

    function revealPack(uint256 packId) external {
        require(ownerOf(packId) == msg.sender, "Only pack owner can reveal");
        require(packContents[packId].length > 0, "Invalid pack ID");

        uint256[] memory tokenIds = packContents[packId];
        delete packContents[packId];

        for (uint256 i = 0; i < tokenIds.length; i++) {
            DojoArt(mainContract).mint(msg.sender, tokenIds[i]);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");

        string memory json = string(
            abi.encodePacked(
                '{"name": "DojoArtPack #',
                tokenId.toString(),
                '", "description": "DojoArt Pack", "image": "https://ipfs.io/ipfs/',
                tokenId.toString(),
                '", "attributes": []}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", bytes(json).encode()));
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}