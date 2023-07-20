// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC-20 Sub-contract: DojoCurrency
contract DojoCurrency is ERC20 {
    constructor() ERC20("Dojo", "DOJO") {
        _mint(address(this), 1000000 * 10 ** decimals());
    }

    function transferFromMain(address to, uint256 amount) external {
        transfer(to, amount);
    }
}
