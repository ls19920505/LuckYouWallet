const crypto = require('crypto');

const ALPHABET = 'abcdefghijklmnop'; // 16 characters for 256 combinations

function byteToWord(b) {
  const first = ALPHABET[Math.floor(b / 16)];
  const second = ALPHABET[b % 16];
  return first + second;
}

function wordToByte(word) {
  if (word.length !== 2) throw new Error('Invalid mnemonic word');
  const first = ALPHABET.indexOf(word[0]);
  const second = ALPHABET.indexOf(word[1]);
  if (first === -1 || second === -1) throw new Error('Invalid mnemonic word');
  return first * 16 + second;
}

function mnemonicToSeed(mnemonic) {
  const words = mnemonic.trim().split(/\s+/);
  const bytes = Buffer.from(words.map(wordToByte));
  return crypto.createHash('sha256').update(bytes).digest();
}

function fromPrivateKeyBytes(bytes) {
  const ecdh = crypto.createECDH('secp256k1');
  ecdh.setPrivateKey(bytes);
  const pub = ecdh.getPublicKey(null, 'uncompressed');
  const jwk = {
    kty: 'EC',
    crv: 'secp256k1',
    d: bytes.toString('base64url'),
    x: pub.slice(1, 33).toString('base64url'),
    y: pub.slice(33).toString('base64url')
  };
  const privateKey = crypto.createPrivateKey({ key: jwk, format: 'jwk' });
  const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  return new Wallet(privateKey, publicKey);
}

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

  static generateMnemonic() {
    const bytes = crypto.randomBytes(12);
    const words = Array.from(bytes).map(byteToWord);
    return words.join(' ');
  }

  static fromMnemonic(mnemonic) {
    const seed = mnemonicToSeed(mnemonic);
    return fromPrivateKeyBytes(seed.subarray(0, 32));
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
