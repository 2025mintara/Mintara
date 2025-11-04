// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MintaraToken
 * @dev ERC20 token with optional mint and burn capabilities
 */
contract MintaraToken is ERC20, Ownable {
    uint8 private _decimals;
    bool public canMint;
    bool public canBurn;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply,
        address owner,
        bool _canMint,
        bool _canBurn
    ) ERC20(name, symbol) Ownable(owner) {
        _decimals = decimals_;
        canMint = _canMint;
        canBurn = _canBurn;
        _mint(owner, initialSupply * (10 ** decimals_));
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(canMint, "Minting is disabled");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        require(canBurn, "Burning is disabled");
        _burn(msg.sender, amount);
    }
}

/**
 * @title MintaraTokenFactory
 * @dev Factory contract for creating Mintara tokens
 */
contract MintaraTokenFactory {
    event TokenCreated(
        address indexed tokenAddress,
        address indexed owner,
        string name,
        string symbol,
        uint256 initialSupply
    );

    struct TokenInfo {
        address tokenAddress;
        string name;
        string symbol;
        uint8 decimals;
        uint256 initialSupply;
        address owner;
        uint256 createdAt;
    }

    mapping(address => TokenInfo[]) public userTokens;
    TokenInfo[] public allTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        bool canMint,
        bool canBurn
    ) external returns (address) {
        MintaraToken newToken = new MintaraToken(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender,
            canMint,
            canBurn
        );

        address tokenAddress = address(newToken);

        TokenInfo memory tokenInfo = TokenInfo({
            tokenAddress: tokenAddress,
            name: name,
            symbol: symbol,
            decimals: decimals,
            initialSupply: initialSupply,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        userTokens[msg.sender].push(tokenInfo);
        allTokens.push(tokenInfo);

        emit TokenCreated(tokenAddress, msg.sender, name, symbol, initialSupply);

        return tokenAddress;
    }

    function getUserTokens(address user) external view returns (TokenInfo[] memory) {
        return userTokens[user];
    }

    function getAllTokens() external view returns (TokenInfo[] memory) {
        return allTokens;
    }

    function getTotalTokensCreated() external view returns (uint256) {
        return allTokens.length;
    }
}
