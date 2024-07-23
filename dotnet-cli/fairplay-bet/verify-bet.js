let nonce = LastSecretNumber;
async function getRoll(serverSeed, clientSeed, nonce){
    let x = serverSeed + clientSeed + nonce;
    let hash = crypto.createHash('sha256').update(x).digest('hex');
    let subhash = hash.substr(0, 10);
    let hexdec = parseInt(subhash, 16);
    let SecretNumber = Number(hexdec % 1000000);
    return Number(SecretNumber);
}