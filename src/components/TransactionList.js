/* eslint-disable react/forbid-prop-types */
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
  const showTransactionList = () => {
    // Show the transaction list if there is at least one transaction
    if (transactions.length > 0) {
      return transactions.map(({ from, to, value, hash }) => {
        return <TransactionElement from={from} to={to} value={value} key={hash} hash={hash} />;
      });
    }
    // Show an item indicating that no transactions were found
    return (
      <ListGroup.Item variant="warning" className="transactions-empty">
        <strong>There are 0 transactions in this block sending ETH </strong>
      </ListGroup.Item>
    );
  };

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
      {showTransactionList()}
    </div>
  );
};

TransactionList.propTypes = {
  account: PropTypes.string.isRequired,
  seletedBlockData: PropTypes.shape({
    number: PropTypes.number,
    transactions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setTransactions: PropTypes.func.isRequired,
  setScreenName: PropTypes.func.isRequired,
  setSeletedBlockData: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }),
  ).isRequired,
  web3: PropTypes.object.isRequired,
};

export default TransactionList;
