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


## Frontend demo

A simple HTML page that connects to an Ethereum wallet is available at `src/index.html`.

### Run the demo

1. Install a browser wallet extension such as MetaMask.
2. Start a static file server in the `src` folder (for example `npx http-server src`).
3. Open `http://localhost:8080/index.html` in your browser.
4. Click **Connect Wallet** and approve the request in MetaMask.
5. Your address and balance will appear and you can send ETH to another address.

### Test the code

Run the existing Node.js tests:

```bash
npm test
```
