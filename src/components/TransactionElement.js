import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import '../App.css';

const TransactionElement = ({ hash, from, to, value }) => {
  return (
    <Card text="light" key={hash} className="transaction-card">
      <Card.Body>
        <Card.Title>
          <div className="transaction-text">
            <strong>From: </strong> {from} <br />
            <strong>To: </strong> {to} <br />
            <strong>Value: </strong> {value} <br />
            <strong>Tx Hash: </strong> {hash}
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

TransactionElement.propTypes = {
  hash: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TransactionElement;
