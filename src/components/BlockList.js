import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { getBlockTransactionsData } from '../helpers/transactions';
import { TRANSACTIONS_SCREEN } from '../constants/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const BlockList = ({ setTransactions, setScreenName, setSeletedBlockData, web3, blocks }) => {
  const blockSelected = async block => {
    toast("⏳Loading...");
    const blockTransactions = await getBlockTransactionsData(web3, block.transactions);
    setTransactions(blockTransactions);
    setScreenName(TRANSACTIONS_SCREEN);
    setSeletedBlockData(block);
  };

  return (
    <div>
      <ToastContainer />
      {blocks.map(block => {
        return (
          <ListGroup.Item
            action
            key={block.number}
            onClick={() => blockSelected(block)}
            className="block-item"
          >
            <strong>Read Block #{block.number}</strong>
          </ListGroup.Item>
        );
      })}
    </div>
  );
};

BlockList.propTypes = {
  setTransactions: PropTypes.func.isRequired,
  setScreenName: PropTypes.func.isRequired,
  setSeletedBlockData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.object.isRequired,
  blocks: PropTypes.arrayOf(Object).isRequired,
};

export default BlockList;
