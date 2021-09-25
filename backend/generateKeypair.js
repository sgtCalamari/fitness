const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  const outPath = path.join(__dirname, 'keys');
  if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);

  fs.writeFileSync(path.join(outPath, 'pubkey.pem'), keyPair.publicKey);
  fs.writeFileSync(path.join(outPath, 'privkey.pem'), keyPair.privateKey);

  console.log(`keys created in ${outPath}`);
}

genKeyPair();
