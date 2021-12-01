/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Funnel, FunnelFill } from 'react-bootstrap-icons';
import { getBlockTransactionsData, filterTransactionsByAddress } from '../helpers/transactions';
import '../App.css';

const FunnelButton = ({
  seletedBlockData,
  setTransactions,
  transactions,
  web3,
  filterByAddress,
  setFilterByAddress,
  account,
}) => {
  const filterHandler = async () => {
    // If the filter was enabled then eliminate the filter
    if (filterByAddress === true) {
      const blockTransactions = await getBlockTransactionsData(web3, seletedBlockData.transactions);
      setTransactions(blockTransactions);
    } else {
      // If the filter was disabled then filter by the user address
      const filteredTransactions = filterTransactionsByAddress(transactions, account);
      setTransactions(filteredTransactions);
    }
    // Updates the filter value to the opposite
    setFilterByAddress(!filterByAddress);
  };
  const tooltipMessage = filterByAddress ? 'Clear Filter' : 'Filter By My Address';
  const funnelProperties = { funnelSize: 40, funnelColor: 'white' };

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipMessage}
    </Tooltip>
  );

  const ShowFunnel = () => {
    if (filterByAddress) {
      return (
        <FunnelFill
          size={funnelProperties.funnelSize}
          white={funnelProperties.funnelColor}
          onClick={filterHandler}
        />
      );
    }
    return (
      <Funnel
        size={funnelProperties.funnelSize}
        white={funnelProperties.funnelColor}
        onClick={filterHandler}
      />
    );
  };
  return (
    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
      {ShowFunnel()}
    </OverlayTrigger>
  );
};

FunnelButton.propTypes = {
  seletedBlockData: PropTypes.shape({
    number: PropTypes.number,
    transactions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setTransactions: PropTypes.func.isRequired,
  filterByAddress: PropTypes.bool.isRequired,
  setFilterByAddress: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }),
  ).isRequired,
  web3: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

export default FunnelButton;
