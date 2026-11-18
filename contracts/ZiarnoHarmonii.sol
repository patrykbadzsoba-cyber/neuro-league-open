// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Ziarno Harmonii (ZH) — conservative ERC-20 launch candidate.
// IMPORTANT: This is source code for review and testnet validation only.
// It has NOT been audited or deployed. Do not deploy to mainnet until the
// token model, legal review, supply and distribution are formally approved.

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZiarnoHarmonii is ERC20 {
    error ZeroInitialSupply();
    error ZeroInitialHolder();

    /// @param initialHolder Address receiving the entire fixed initial supply.
    /// @param initialSupply Whole-token amount (not wei); 18 decimals are applied.
    constructor(address initialHolder, uint256 initialSupply)
        ERC20("Ziarno Harmonii", "ZH")
    {
        if (initialHolder == address(0)) revert ZeroInitialHolder();
        if (initialSupply == 0) revert ZeroInitialSupply();

        _mint(initialHolder, initialSupply * 10 ** decimals());
    }
}
