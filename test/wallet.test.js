const assert = require('assert');
const { Wallet } = require('../src/wallet');

function testGenerate() {
  const wallet = Wallet.generate();
  assert.ok(/^0x[a-f0-9]{40}$/.test(wallet.address));
  const message = 'hello';
  const sig = wallet.signMessage(message);
  assert.ok(wallet.verifyMessage(message, sig));
}

function testExportRestore() {
  const wallet1 = Wallet.generate();
  const pem = wallet1.exportPrivateKey();
  const wallet2 = Wallet.fromPrivateKey(pem);
  assert.equal(wallet1.address, wallet2.address);
}

testGenerate();
testExportRestore();
console.log('All tests passed.');
