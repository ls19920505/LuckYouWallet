const crypto = require('crypto');

class Wallet {
  constructor(privateKey, publicKey) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.address = Wallet.computeAddress(publicKey);
  }

  static generate() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'secp256k1'
    });
    return new Wallet(privateKey, publicKey);
  }

  static fromPrivateKey(pem) {
    const privateKey = crypto.createPrivateKey({ key: pem, format: 'pem' });
    const publicKey = crypto.createPublicKey(privateKey);
    return new Wallet(privateKey, publicKey);
  }

  static computeAddress(publicKey) {
    const pubDer = publicKey.export({ type: 'spki', format: 'der' });
    const hash = crypto.createHash('sha256').update(pubDer).digest('hex');
    return '0x' + hash.slice(-40); // last 20 bytes as address
  }

  exportPrivateKey() {
    return this.privateKey.export({ type: 'pkcs8', format: 'pem' });
  }

  signMessage(message) {
    const sign = crypto.createSign('sha256');
    sign.update(message);
    sign.end();
    return sign.sign(this.privateKey, 'hex');
  }

  verifyMessage(message, signature) {
    const verify = crypto.createVerify('sha256');
    verify.update(message);
    verify.end();
    return verify.verify(this.publicKey, signature, 'hex');
  }
}

module.exports = { Wallet };
