/**
 * This function returns an array with the data of the latest 10 blocks
 * @param {Object} web3 - web3 instance
 */
export const getLatestBlocks = async web3 => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    // Requesting information for the 10 blocks sequentially
    const latestBlocksPromises = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
        const blockNumber = latestBlockNumber - i;
        const blockDataPromise = web3.eth.getBlock(blockNumber);
        // const blockDataPromise = web3.eth.getBlock(blockNumber).then(data => ({...data, blockNumber})); // This might not be necessary
        latestBlocksPromises.push(blockDataPromise);
    }
    // Resolving block promises
    const latestBlocks = await Promise.all(latestBlocksPromises);
    return latestBlocks;
};

/**
 * This function returns an array with the transactions data of a given block number,
 * filtered by the transactions sending ETH
 * @param {Object} web3 - web3 instance
 * @param {Array} transactionHashes - An array with the transaction hashes of the block
 */
export const getBlockTransactionsData = async (web3, transactionHashes) => {
    // Requesting information for all transactions sequentially
    const transactionsPromises = transactionHashes.map(transactionHash => {
        const transactionPromise = web3.eth.getTransaction(transactionHash);
        return transactionPromise;
    });
    // Resolving transaction promises
    const allTransactions = await Promise.all(transactionsPromises);
    const filteredTransactions = allTransactions.filter(tx => tx.value !== '0');
    return filteredTransactions;
};

/**
 * This function returns an array with the filtered transactions where
 * the user addres is participating in the "from" or "to" address
 * @param {Array} blockTransactions - An array with the transaction hashes of the block
 * @param {string} userAddress - An array with the transaction hashes of the block
 */
export const filterTransactionsByAddress = (blockTransactions, userAddress) => {
    return blockTransactions.filter(transaction => {
        const isUserAddressInFrom = transaction.from === userAddress;
        const isUserAddressInTo = transaction.to === userAddress;
        return isUserAddressInFrom || isUserAddressInTo;
    });
};
