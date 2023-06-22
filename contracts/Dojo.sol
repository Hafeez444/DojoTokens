// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./DojoCurrency.sol";
import "./DojoArt.sol";
import "./DojoArtPacks.sol";

// ERC-1155 Main Contract: Dojo
contract Dojo is ERC1155, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    mapping(address => bool) private whitelist;
    bool public isWhitelistEnabled;
    bool public isPublicMintingEnabled;

    DojoCurrency public dojoCurrency;
    DojoArt public dojoArt;
    DojoArtPacks public dojoArtPacks;

    constructor() ERC1155("") {
        dojoCurrency = new DojoCurrency();
        dojoArt = new DojoArt(address(this));
        dojoArtPacks = new DojoArtPacks(address(this));
        isWhitelistEnabled = true;
        isPublicMintingEnabled = false;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Restricted to admins");
        _;
    }

    function setBaseURI(string memory newBaseURI) external onlyAdmin {
        _setURI(newBaseURI);
    }

    // Whitelist Management

    function addToWhitelist(address[] memory addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = true;
        }
    }

    function removeFromWhitelist(address[] memory addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = false;
        }
    }

    function toggleWhitelistEnabled() external onlyAdmin {
        isWhitelistEnabled = !isWhitelistEnabled;
    }

    // Public Minting Management

    function togglePublicMintingEnabled() external onlyAdmin {
        isPublicMintingEnabled = !isPublicMintingEnabled;
    }

    function mint(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) external onlyAdmin {
        require(
            isWhitelistEnabled && whitelist[msg.sender],
            "Address not whitelisted or whitelist is disabled"
        );

        _mint(to, tokenId, amount, data);
    }

    function mintPublic(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) external onlyAdmin {
        require(
            isPublicMintingEnabled || (isWhitelistEnabled && whitelist[msg.sender]),
            "Address not whitelisted or public minting is disabled"
        );

        _mint(to, tokenId, amount, data);
    }

    function _mint(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) internal
    override {
        if (amount > 1) {
            dojoArtPacks.mintPack(to, _generateTokenIds(tokenId, amount));
        } else {
            dojoArt.mint(to, tokenId);
        }

        emit TransferSingle(msg.sender, address(0), to, tokenId, amount);

        if (data.length > 0) {
            emit URI(string(abi.encodePacked(uri(tokenId)), ".json"), tokenId);
        }
    }

    function _generateTokenIds(uint256 packId, uint256 amount)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory tokenIds = new uint256[](amount);

        for (uint256 i = 0; i < amount; i++) {
            tokenIds[i] = packId * 100 + i;
        }

        return tokenIds;
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
