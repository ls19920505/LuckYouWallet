const { Wallet } = require('../src/wallet');

test('generate wallet and sign message', () => {
  const wallet = Wallet.generate();
  expect(/^0x[a-f0-9]{40}$/.test(wallet.address)).toBe(true);
  const message = 'hello';
  const sig = wallet.signMessage(message);
  expect(wallet.verifyMessage(message, sig)).toBe(true);
});

test('export and restore wallet', () => {
  const wallet1 = Wallet.generate();
  const pem = wallet1.exportPrivateKey();
  const wallet2 = Wallet.fromPrivateKey(pem);
  expect(wallet1.address).toBe(wallet2.address);
});

test('generate mnemonic and restore wallet', () => {
  const mnemonic = Wallet.generateMnemonic();
  expect(mnemonic.split(' ').length).toBe(12);
  const wallet1 = Wallet.fromMnemonic(mnemonic);
  const wallet2 = Wallet.fromMnemonic(mnemonic);
  expect(wallet1.address).toBe(wallet2.address);
  const message = 'mnemonic';
  const sig = wallet1.signMessage(message);
  expect(wallet2.verifyMessage(message, sig)).toBe(true);
});
