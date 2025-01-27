<div align="center">

# Move Agent Kit

An open-source toolkit for connecting AI agents to Move/Aptos protocols.


![NPM Downloads](https://img.shields.io/npm/dm/move-agent-kit?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/MetaMove/move-agent-kit?style=for-the-badge)

</div>
<br />

<strong>Move Agent Kit</strong> is a comprehensive toolkit designed to simplify AI agents' interactions with Move-based blockchains. It provides a unified interface for performing various blockchain operations, making it easier for developers to build AI-powered applications that can interact with different Move-based protocols and applications.

The toolkit serves as a bridge between AI agents and Move-based blockchain ecosystems, enabling seamless integration of blockchain capabilities into AI applications. Whether you're building a chatbot with wallet functionality or a complex multi-agent system, Move Agent Kit provides the necessary tools and abstractions to handle blockchain interactions efficiently.

### Key Features

#### Token Operations
- Standard Token Management

- Transfer tokens between accounts

- Mint new tokens

- Burn existing tokens

#### NFT Operations

- Create new NFT collections

- Mint NFTs

- Transfer NFTs between accounts

- Burn NFTs

### Blockchain Interaction
- Read and parse blockchain data

- Monitor blockchain events

- Execute smart contract calls

### Account Management
- Transaction signing

- Message signing

- Account creation and management

### Supported Applications
Move Agent Kit provides native integration with several prominent Move-based applications:

#### Currently Supported
- Joule: Lending borrowing defi operations

- Amnis: Staking operations

- Thala: Staking and DEX operations

- Echelon: Lending borrowing defi operations

- LiquidSwap: DEX operations

- Panora: DEX aggregation operations

- Aries: Lending borrowing defi operations

- Echo: Staking operations

### Upcoming Features
- Image Generation capabilities

- Twitter Integration for social media interaction

### Architecture Overview
Move Agent Kit follows a modular architecture that enables easy extension and maintenance:

<pre>
Move Agent Kit
├── Core Modules
│   ├── Token Operations
│   ├── Blockchain Reader
│   └── Account Operations
├── Integration Layer
│   ├── Application Connectors
│   └── Protocol Adapters
└── Extension Modules
    ├── Image Generation
    └── Social Media Integration (Coming Soon
</pre>

### Example Implementations
#### 1. Interactive Wallet Chatbot

- Full blockchain interaction capabilities

- Natural language processing for commands

- Automated transaction handling

#### 2. Multi-Agent System (LangGraph Based)

- Orchestrator Agent: Central decision-making and task delegation

- Read Agent: Read Blockchain Data

- Action Agent: Blockchain transaction execution

This modular design allows for easy integration with existing systems while maintaining flexibility for future extensions and modifications.

## Documentation

You can view the full documentation of the kit here - [Move Agent Kit Documentation](https://metamove.gitbook.io/move-agent-kit).

## Security

This toolkit handles private keys and transactions. Always ensure you're using it in a secure environment and never share your private keys.
