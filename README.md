# LuckYouWallet

Minimal Web3 wallet framework scaffold built with Node.js.

## Features

- Generate a new wallet using the `secp256k1` curve
- Derive a simple address from the wallet's public key
- Sign and verify arbitrary messages
- Export and restore wallets from PEM encoded private keys

> **Note:** This project avoids external dependencies. For full Ethereum
> compatibility (e.g. true `keccak256` addresses, transaction signing and
> mnemonic phrases) integrate a library such as `ethers`.

## Development

Run the test suite:

```bash
npm test
```

