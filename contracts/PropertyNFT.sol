// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PropertyNFT: Manages tokenized real estate properties.
contract PropertyNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId; // Counter for the next property ID
    mapping(uint256 => uint256) public propertyValue; // Stores the value of each property

    /// @dev Emitted when a new property is minted.
    event PropertyMinted(uint256 tokenId, address owner, uint256 value, string metadata);

    /// @dev Emitted when the value of a property is updated.
    event ValueUpdated(uint256 tokenId, uint256 oldValue, uint256 newValue);

    constructor() ERC721("PropertyNFT", "PROP") {}

    /// @notice Mint a new property NFT.
    /// @param to The address of the new property owner.
    /// @param value The initial valuation of the property.
    /// @param metadata The metadata URI for the property.
    function mintProperty(address to, uint256 value, string memory metadata) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId); // Mint the NFT to the given address
        _setTokenURI(tokenId, metadata); // Set the metadata URI for the NFT
        propertyValue[tokenId] = value; // Store the initial value of the property

        emit PropertyMinted(tokenId, to, value, metadata); // Emit event for minting
    }

    /// @notice Update the value of an existing property.
    /// @param tokenId The ID of the property to update.
    /// @param newValue The new valuation of the property.
    function updatePropertyValue(uint256 tokenId, uint256 newValue) external onlyOwner {
        uint256 oldValue = propertyValue[tokenId]; // Retrieve the current value
        propertyValue[tokenId] = newValue; // Update to the new value

        emit ValueUpdated(tokenId, oldValue, newValue); // Emit event for value update
    }
}
