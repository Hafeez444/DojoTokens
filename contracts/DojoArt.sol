// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// ERC-721 Sub-contract: DojoArt
contract DojoArt is ERC721, AccessControl {
    using Strings for uint256;

    struct Art {
        uint256 trait1;
        uint256 trait2;
        uint256 trait3;
        uint256 trait4;
        uint256 trait5;
        uint256 trait6;
    }

    mapping(uint256 => Art) private artList;
    mapping(string => string[]) private traitNames;

    constructor(address _mainContract) ERC721("DojoArt", "DOJOART") {
        _setupRole(DEFAULT_ADMIN_ROLE, _mainContract);
        _setTraitNames();
        _preDefineTokens();
    }

    function _preDefineTokens() private {
        //Create Token 1
        // _setTraits(1, [0, 1, 2, 3, 4, 5]);

        // Add more pre-defined tokens as needed
    }

    function mint(address to, uint256 tokenId) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized access");
        _mint(to, tokenId);
    }

    function _setTraits(uint256 tokenId, uint256[6] memory traits) private {
        require(_exists(tokenId), "Token ID does not exist");

        artList[tokenId] = Art({
            trait1: traits[0],
            trait2: traits[1],
            trait3: traits[2],
            trait4: traits[3],
            trait5: traits[4],
            trait6: traits[5]
        });
    }

    function getTraits(uint256 tokenId)
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        require(_exists(tokenId), "Token ID does not exist");

        Art memory art = artList[tokenId];

        return (
            art.trait1,
            art.trait2,
            art.trait3,
            art.trait4,
            art.trait5,
            art.trait6
        );
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");

        string memory artType = "";
        Art memory art = artList[tokenId];

        string memory json = string(
            abi.encodePacked(
                '{"name": "DojoArt #',
                tokenId.toString(),
                '", "description": "DojoArt NFT with 6 Traits", "image": "https://ipfs.io/ipfs/',
                tokenId.toString(),
                '", "attributes": ['
            )
        );

        artType = _getArtType(art.trait1);

        json = string(
            abi.encodePacked(
                json,
                _createAttribute("Character", artType),
                ',',
                _createAttribute(traitNames[artType][0], Strings.toString(art.trait2)),
                ',',
                _createAttribute(traitNames[artType][1], Strings.toString(art.trait3)),
                ',',
                _createAttribute(traitNames[artType][2], Strings.toString(art.trait4)),
                ',',
                _createAttribute(traitNames[artType][4], Strings.toString(art.trait5)),
                ',',
                _createAttribute(traitNames[artType][5], Strings.toString(art.trait6))
            )
        );

        json = string(abi.encodePacked(json, "]}"));

        return string(abi.encodePacked("data:application/json;base64,", bytes(json).encode()));
    }

    function _getArtType(uint256 trait1) internal returns (string memory)
    {
        if(trait1 == 0)
        {
            return "Ninja";
        }
        else if(trait1 == 1)
        {
            return "Sumo";
        }
        else if(trait1 == 2)
        {
            return "Fighter";
        }
    }

    function _createAttribute(string memory traitName, string memory traitValue)
        private
        pure
        returns (string memory)
    {
        return string(
            abi.encodePacked(
                '{"trait_type": "',
                traitName,
                '", "value": "',
                traitValue,
                '"}'
            )
        );
    }

    function _setTraitNames() private {
        traitNames["Ninja"] = ["Weapon", "Hood", "Skin color", "Eyes", "Belt"];
        traitNames["Sumo"] = ["Hair", "Mawashi", "Skin color", "Tattoo", "Face"];
        traitNames["Fighter"] = ["Hair", "Belt", "Limbs", "Eyes", "Gi"];
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