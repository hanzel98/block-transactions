import Web3 from 'web3';

let web3;

const getWebSocketUrl = () => {
    switch (process.env.REACT_APP_NETWORK){ 
        case 'mainnet':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_MAINNET;
        case 'rinkeby':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_RINKEBY;
        case 'ropsten':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_ROPSTEN;
        case 'kovan':
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_KOVAN;
        default:
            return process.env.REACT_APP_WS_PROVIDER_ETHEREUM_MAINNET;
    }
};

export const connectWeb3 = () => {
    if (isConnected()) return web3;
    const provider = new Web3.providers.WebsocketProvider(getWebSocketUrl());
    provider.on('error', console.error);
    provider.on('connect', () => console.log('Blockchain Connected ...'));
    provider.on('end', console.error);
    web3 = new Web3(provider);
    console.log('web3:', web3)
    return web3;
};

/**
 * Checks the status of connection
 *
 * @return {Boolean} - Resolves to true or false
*/
const isConnected = () => {
    if (web3) return web3.eth.net.isListening();
    return false;
};

/**
 * This function returns an array with the data of the latest 10 blocks
*/
export const getLatestBlocks = async () => {
    if (!isConnected()) connectWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();
    // Requesting information for the 10 blocks sequentially
    const latestBlocksPromises = [];
    for (let i=0; i < 10; i++) {
        const blockNumber = latestBlockNumber - i;
        const blockDataPromise = web3.eth.getBlock(blockNumber).then(data => ({...data, blockNumber})); // This might not be necessary
        latestBlocksPromises.push(blockDataPromise);
    }
    // Resolving block promises
    const latestBlocks = await Promise.all(latestBlocksPromises);
    return latestBlocks;
};

/**
 * This function returns an array with the transactions data of a given block number,
 * filtered by the transactions sending ETH
 * @param {Array} - An array with the transaction hashes of the block 
*/
export const getBlockTransactionsData = async (transactionHashes) => {
    if (!isConnected()) connectWeb3();
    // Requesting information for all transactions sequentially
    const transactionsPromises = [];
    for (const transactionHash of transactionHashes) {
        let transactionPromise = web3.eth.getTransaction(transactionHash);
        transactionsPromises.push(transactionPromise);
    }
    // Resolving transaction promises
    const allTransactions = await Promise.all(transactionsPromises);
    const filteredTransactions = allTransactions.filter(tx => tx.value !== '0');
    return filteredTransactions;
};

export const closeWeb3Connection = () => {
    web3.currentProvider.connection.close();
};