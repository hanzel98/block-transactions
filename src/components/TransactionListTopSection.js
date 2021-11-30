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
  return (
    <Container>
      <Row>
        <Col className="transaction-element-left arrow-left">
          <ArrowLeftCircle
            color="white"
            size={40}
            onClick={() => {goBackHandle()}}
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
      {filterByAddress ? (
        <Row>
          <Col className="transaction-element-left filter-message">
            <div>{`Filtering by this address: ${account}`}</div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </Container>
  );
};

TransactionListTopSection.propTypes = {
  account: PropTypes.string.isRequired,
  seletedBlockData: PropTypes.any.isRequired,
  setTransactions: PropTypes.func.isRequired,
  setScreenName: PropTypes.func.isRequired,
  setSeletedBlockData: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(Object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.object.isRequired,
};

export default TransactionListTopSection;
