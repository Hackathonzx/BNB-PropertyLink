// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title TransactionHandler: Manages payments and rental income distribution.
contract TransactionHandler {
    mapping(uint256 => uint256) public rentalIncome; // Tracks rental income for each property
    mapping(uint256 => address[]) public owners; // Tracks owners of a property
    mapping(uint256 => mapping(address => uint256)) public sharePercentages; // Tracks ownership percentages

    /// @dev Emitted when rental income is distributed for a property.
    event RentalIncomeDistributed(uint256 propertyId, uint256 totalIncome);

    /// @notice Distribute rental income to fractional owners.
    /// @param propertyId The ID of the property.
    function distributeRentalIncome(uint256 propertyId) external payable {
        uint256 totalIncome = msg.value; // The rental income received
        require(totalIncome > 0, "No rental income to distribute");

        rentalIncome[propertyId] += totalIncome; // Update the total income for the property

        for (uint256 i = 0; i < owners[propertyId].length; i++) {
            address owner = owners[propertyId][i];
            uint256 share = (totalIncome * sharePercentages[propertyId][owner]) / 100; // Calculate the share
            payable(owner).transfer(share); // Transfer the calculated share
        }

        emit RentalIncomeDistributed(propertyId, totalIncome); // Emit event for income distribution
    }

    /// @notice Register a new fractional owner for a property.
    /// @param propertyId The ID of the property.
    /// @param owner The address of the new owner.
    /// @param percentage The percentage of ownership for the new owner.
    function registerOwner(uint256 propertyId, address owner, uint256 percentage) external {
        owners[propertyId].push(owner); // Add the owner to the property
        sharePercentages[propertyId][owner] = percentage; // Set the ownership percentage
    }

    // Add a getter function
    function getOwners(uint256 propertyId) public view returns (address[] memory) {
    return owners[propertyId];
   }
}
