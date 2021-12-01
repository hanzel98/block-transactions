import React, { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../App.css';

const BlockItem = ({block, blockSelected}) => {
    return (
        <ListGroup.Item
            action
            onClick={()=> {blockSelected(block)}}
            className="block-item"
        >
            <strong>Read Block #{block.number}</strong>
        </ListGroup.Item>
    );
};

BlockItem.propTypes = {
    block: PropTypes.shape({
        number: PropTypes.number.isRequired
    }).isRequired,
    blockSelected: PropTypes.func.isRequired,
};

// Check if props changed to see if re-rendering is necessary
function blockItemPropsAreEqual(prevProps, nextProps) {
    return prevProps.block.number === nextProps.block.number;
}

export default memo(BlockItem, blockItemPropsAreEqual);
