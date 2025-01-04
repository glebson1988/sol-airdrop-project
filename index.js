const {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL
} = require('@solana/web3.js');

const wallet = Keypair.generate();
const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(publicKey);
        console.log("Balance: ", balance / LAMPORTS_PER_SOL);
    } catch (error) {
        console.error(error);
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const signature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: signature
        });
        console.log("Airdrop successful");
    } catch (error) {
        console.error(error);
    }
}

const main = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
main();
