/**
 * @jest-environment node
 */
import Ganache from "ganache-core";
import Web3 from "web3";

import {
  getLatestBlocks,
  getBlockTransactionsData,
  filterTransactionsByAddress
} from '../helpers/transactions';

describe("test blockchain functions", () => {
  let accounts;
  let provider;
  let web3;
  beforeEach(async () => {
    // It generates new transactions before each test so that each test is independent
    provider = Ganache.provider();
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    const valueInWei = web3.utils.toWei("0.0001", "ether");
    // Processing the transactions in parallel
    const transactionPromises = [];
    for(let i=0; i < 10; i++){
      transactionPromises.push(web3.eth.sendTransaction({from: accounts[0],to: accounts[i], value: valueInWei}));
    }
    await Promise.all(transactionPromises);
  });

  describe("testing latest blocks", () => {
    test('get the last block', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      expect(blocks).toHaveLength(1);
    });

    test('get latest 5 blocks', async () => {
      const amountOfBlocks = 5;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      expect(blocks).toHaveLength(5);
    });

    test('get latest 10 blocks', async () => {
      const amountOfBlocks = 10;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      expect(blocks).toHaveLength(10);
    });

    test('get default amount of latest blocks', async () => {
      const blocks = await getLatestBlocks(web3);
      expect(blocks).toHaveLength(10);
    });

    test('validate block properties', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      expect(blocks[0]).toHaveProperty('number');
      expect(blocks[0]).toHaveProperty('hash');
      expect(blocks[0]).toHaveProperty('transactions');
    });

    test('increment block number', async () => {
      const amountOfBlocks = 10;
      const blocksBefore = await getLatestBlocks(web3, amountOfBlocks);
      // Creating new transaction to include a new block
      const valueInWei = web3.utils.toWei("0.0001", "ether");
      await web3.eth.sendTransaction({from: accounts[0],to: accounts[1], value: valueInWei})
      const blocksAfter = await getLatestBlocks(web3, amountOfBlocks);
      const firstBlockBefore = blocksBefore[0];
      const firstBlockAfter = blocksAfter[0];
      expect(firstBlockAfter.number).toBeGreaterThan(firstBlockBefore.number);
    });
  });

  describe("testing transactions without filter", () => {
    test('get block transactions data', async () => {
      const amountOfBlocks = 10;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      const blockTransactions = await getBlockTransactionsData(web3, blocks[0].transactions);
      expect(blockTransactions).toHaveLength(1);
    });

    test('validate transaction properties after filter', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      const blockTransactions = await getBlockTransactionsData(web3, blocks[0].transactions);
      // Validating properties of the first transaction
      expect(blockTransactions[0]).toHaveProperty('from');
      expect(blockTransactions[0]).toHaveProperty('to');
      expect(blockTransactions[0]).toHaveProperty('value');
      expect(blockTransactions[0]).toHaveProperty('hash');
    });
  });

  describe("testing filtered transactions", () => {
    test('filter transactions by matched address', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      const blockTransactions = await getBlockTransactionsData(web3, blocks[0].transactions);
      const filteredTransactions = await filterTransactionsByAddress(blockTransactions, accounts[0]);
      expect(filteredTransactions).toHaveLength(1);
    });

    test('filter transactions by unmatched address', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      const blockTransactions = await getBlockTransactionsData(web3, blocks[0].transactions);
      const randomAddress = '0x0E7519Ac25115E8C0ab8CB73eB4cFa503E0E6a26'; // Address not used in tx generation
      const filteredTransactions = await filterTransactionsByAddress(blockTransactions, randomAddress);
      expect(filteredTransactions).toHaveLength(0);
    });

    test('validate transaction properties after filter', async () => {
      const amountOfBlocks = 1;
      const blocks = await getLatestBlocks(web3, amountOfBlocks);
      const blockTransactions = await getBlockTransactionsData(web3, blocks[0].transactions);
      const filteredTransactions = await filterTransactionsByAddress(blockTransactions, accounts[0]);
      // Validating properties of the first transaction
      expect(filteredTransactions[0]).toHaveProperty('from');
      expect(filteredTransactions[0]).toHaveProperty('to');
      expect(filteredTransactions[0]).toHaveProperty('value');
      expect(filteredTransactions[0]).toHaveProperty('hash');
    });
  });

});