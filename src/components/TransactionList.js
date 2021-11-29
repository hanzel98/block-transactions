import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import TransactionListTopSection from './TransactionListTopSection';
import TransactionElement from './TransactionElement';
import '../App.css';

const TransactionList = ({
  account,
  seletedBlockData,
  setTransactions,
  setScreenName,
  setSeletedBlockData,
  transactions,
  web3,
}) => {
  return (
    <div className="transaction-list">
      <TransactionListTopSection
        account={account}
        seletedBlockData={seletedBlockData}
        setTransactions={setTransactions}
        setScreenName={setScreenName}
        setSeletedBlockData={setSeletedBlockData}
        transactions={transactions}
        web3={web3}
      />

      {transactions.length > 0 ? (
        transactions.map(({ from, to, value, hash }) => {
          return <TransactionElement from={from} to={to} value={value} key={hash} hash={hash} />;
        })
      ) : (
        <ListGroup.Item variant="warning" className="transactions-empty">
          <strong>There are 0 transactions in this block sending ETH </strong>
        </ListGroup.Item>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  account: PropTypes.string.isRequired,
  seletedBlockData: PropTypes.shape({}).isRequired,
  setTransactions: PropTypes.func.isRequired,
  setScreenName: PropTypes.func.isRequired,
  setSeletedBlockData: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(Object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.object.isRequired,
};

export default TransactionList;
