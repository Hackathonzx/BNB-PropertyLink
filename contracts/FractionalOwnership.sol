// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title FractionalOwnership: Manages fractional ownership of properties.
contract FractionalOwnership is Ownable {
    struct Share {
        address owner; // Address of the share owner
        uint256 percentage; // Percentage of ownership
    }

    mapping(uint256 => Share[]) public propertyShares; // Tracks ownership shares for each property
    mapping(uint256 => mapping(address => bool)) public governanceVotes; // Tracks governance votes for each property

    /// @dev Emitted when a new share is issued to an owner.
    event SharesIssued(uint256 propertyId, address to, uint256 percentage);

    /// @dev Emitted when an owner votes on a governance decision.
    event Voted(uint256 propertyId, address voter, string decision);

    /// @notice Issue a fractional ownership share of a property.
    /// @param propertyId The ID of the property.
    /// @param to The address of the new fractional owner.
    /// @param percentage The percentage of ownership being issued.
    function issueShare(uint256 propertyId, address to, uint256 percentage) external onlyOwner {
        require(percentage > 0 && percentage <= 100, "Invalid percentage");

        propertyShares[propertyId].push(Share(to, percentage)); // Add the share to the list
        emit SharesIssued(propertyId, to, percentage); // Emit event for issuing share
    }

    // Add a getter function 
    function getPropertyShares(uint256 propertyId) public view returns (Share[] memory) {
    return propertyShares[propertyId];
}


    /// @notice Vote on a governance decision for a property.
    /// @param propertyId The ID of the property.
    /// @param decision The decision being voted on (e.g., "sell", "improve").
    function voteOnDecision(uint256 propertyId, string memory decision) external {
        require(ownsShare(propertyId, msg.sender), "You must own a share to vote");
        require(!governanceVotes[propertyId][msg.sender], "You have already voted");

        governanceVotes[propertyId][msg.sender] = true; // Mark the sender as having voted
        emit Voted(propertyId, msg.sender, decision); // Emit event for voting
    }

    /// @notice Check if an address owns a share in a property.
    /// @param propertyId The ID of the property.
    /// @param user The address to check.
    /// @return True if the address owns a share, false otherwise.
    function ownsShare(uint256 propertyId, address user) public view returns (bool) {
        for (uint256 i = 0; i < propertyShares[propertyId].length; i++) {
            if (propertyShares[propertyId][i].owner == user) {
                return true;
            }
        }
        return false; // Return false if no shares are found for the user
    }
}
