/* eslint-disable react/forbid-prop-types */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { getBlockTransactionsData } from '../helpers/transactions';
import { TRANSACTIONS_SCREEN } from '../constants/types';
import BlockItem from './BlockItem';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const BlockList = ({ setTransactions, setScreenName, setSeletedBlockData, web3, blocks }) => {
  const blockSelected = useCallback(
    async block => {
      toast('⏳Loading...');
      const blockTransactions = await getBlockTransactionsData(web3, block.transactions);
      setTransactions(blockTransactions);
      setScreenName(TRANSACTIONS_SCREEN);
      setSeletedBlockData(block);
    },
    [web3, setTransactions, setScreenName, setSeletedBlockData],
  );

  return (
    <div>
      <ToastContainer />
      {blocks.map(block => (
        <BlockItem key={block.number} block={block} blockSelected={blockSelected} />
      ))}
    </div>
  );
};

BlockList.propTypes = {
  setTransactions: PropTypes.func.isRequired,
  setScreenName: PropTypes.func.isRequired,
  setSeletedBlockData: PropTypes.func.isRequired,
  web3: PropTypes.object.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      transactions: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default BlockList;
