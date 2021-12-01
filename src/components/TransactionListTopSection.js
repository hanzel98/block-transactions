/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { BLOCKS_SCREEN } from '../constants/types';
import FunnelButton from './FunnelButton';

import '../App.css';

const TransactionListTopSection = ({
  account,
  seletedBlockData,
  setTransactions,
  setScreenName,
  setSeletedBlockData,
  transactions,
  web3,
}) => {
  const [filterByAddress, setFilterByAddress] = useState(false);

  const goBackHandle = () => {
    setScreenName(BLOCKS_SCREEN);
    setTransactions([]);
    setFilterByAddress(false);
    setSeletedBlockData({});
  };

  const showFilteringMessage = () => {
    if (!filterByAddress) return <></>;
    return (
      <Row>
        <Col className="transaction-element-left filter-message">
          <div>{`Filtering by this address: ${account}`}</div>
        </Col>
      </Row>
    );
  };
  const leftArrowProperties = { size: 40, color: 'white' };

  return (
    <Container>
      <Row>
        <Col className="transaction-element-left arrow-left">
          <ArrowLeftCircle
            color={leftArrowProperties.color}
            size={leftArrowProperties.size}
            onClick={goBackHandle}
          />
        </Col>
      </Row>
      <Row>
        <Col className="transaction-element-left">
          <div>
            Showing block <strong>{seletedBlockData.number}</strong>
          </div>
        </Col>
        <Col className="transaction-element-right">
          <FunnelButton
            seletedBlockData={seletedBlockData}
            setTransactions={setTransactions}
            transactions={transactions}
            web3={web3}
            setFilterByAddress={setFilterByAddress}
            filterByAddress={filterByAddress}
            account={account}
          />
        </Col>
      </Row>
      {showFilteringMessage()}
    </Container>
  );
};

TransactionListTopSection.propTypes = {
  account: PropTypes.string.isRequired,
  seletedBlockData: PropTypes.shape({
    number: PropTypes.number,
    transactions: PropTypes.arrayOf(PropTypes.string)
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
    })
  ).isRequired,
  web3: PropTypes.object.isRequired,
};

export default TransactionListTopSection;
