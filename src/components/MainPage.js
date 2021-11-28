import React, { useEffect, useState } from 'react';
import getWeb3 from '../helpers/getWeb3Connection';
import { getLatestBlocks, getBlockTransactionsData, filterTransactionsByAddress } from '../helpers/transactions';
import { Container, Card, Tab, Row, Col, ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BLOCKS_SCREEN, TRANSACTIONS_SCREEN } from '../constants/types';
import { ArrowLeftCircle, Funnel, FunnelFill } from 'react-bootstrap-icons';
import '../App.css';

const MainPage = props => {
    const [web3, setWeb3] = useState({});
    const [account, setAccount] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filterByAddress, setFilterByAddress] = useState(false);
    const [seletedBlockData, setSeletedBlockData] = useState(0);
    const [screenName, setScreenName] = useState(BLOCKS_SCREEN);
    useEffect(() => {
        async function fetchWeb3() {
            // Get network provider and web3 instance.
            const web3Connection = await getWeb3();
            console.log('web3Connection:', web3Connection)
            setWeb3(web3Connection);
            const accounts = await web3Connection.eth.getAccounts();
            const latestsBlocks = await getLatestBlocks(web3Connection)
            setBlocks(latestsBlocks);
            setAccount([accounts]);
        }
        fetchWeb3();
    }, []);
    
    const BlockList = () => {
        const blockSelected = async (block) => {
            const blockTransactions = await getBlockTransactionsData(web3, block.transactions);
            setTransactions(blockTransactions);
            setScreenName(TRANSACTIONS_SCREEN);
            setSeletedBlockData(block);
        }
        return(
            <div>
            {blocks.map((block, index) => {
                // const hrefValue = `#link${index}`;
                return(
                <ListGroup.Item 
                    action 
                    key={block.number}
                    onClick={()=>blockSelected(block)}
                    style={{color: '#00BCD4'}}
                >
                    <strong>Read Block #{block.number}</strong>
                </ListGroup.Item>);
            })}
            </div>
        );
    };

    const TransactionList = () => {
        const filterHandler = async () => {
            // If the filter was enabled then eliminate the filter 
            if(filterByAddress === true ){
                const blockTransactions = await getBlockTransactionsData(web3, seletedBlockData.transactions);
                setTransactions(blockTransactions);
            } else {
                // If the filter was disabled then filter by the user address
                const filteredTransactions = filterTransactionsByAddress(transactions, '0xa7a82DD06901F29aB14AF63faF3358AD101724A8');
                setTransactions(filteredTransactions);
            }
            // Updates the filter value to the opposite
            setFilterByAddress(!filterByAddress);
            
        }

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                {filterByAddress ? "Clear Filter" : "Filter By My Address"}
            </Tooltip>
        );
        return(
            <div style={{marginBottom: "50px"}}>
                <Container >
                    <Row>
                        <Col style={{textAlign: 'left', paddingLeft: '0px', paddingBottom: '10px'}}>
                        <ArrowLeftCircle color="white" size={40} />
                        {/* <FilterCircle color="white" size={40} /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'left', paddingLeft: '0px'}}>
                            <div>Showing block <strong>{seletedBlockData.number}</strong></div>
                        </Col>
                        <Col style={{textAlign: 'right', paddingLeft: '0px'}}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={renderTooltip}
                        >
                            {filterByAddress ?
                            <FunnelFill 
                                color="white" 
                                size={40} 
                                onClick={(event) => { 
                                            event.preventDefault();
                                            filterHandler();
                                }}
                            /> :
                            <Funnel 
                                color="white" 
                                size={40} 
                                onClick={(event) => { 
                                            event.preventDefault();
                                            filterHandler();
                                }}
                            />
                        }
                        </OverlayTrigger>    
                        </Col>
                    </Row>
                    {filterByAddress ? 
                    <Row>
                        <Col style={{textAlign: 'left', paddingLeft: '0px', fontSize: '3.1vmin'}}>
                            <div >{`Filtering by this address: ${account}`}</div>
                        </Col>
                    </Row>: <></>}
                </Container>
            
            
            {transactions.length > 0 ? 
                transactions.map(({from, to, value, hash}) => {
                return (
                        <Card  text={'light'} key={hash} style={{marginTop: "10px", textAlign: 'left'}}>
                            <Card.Body>
                                <Card.Title >
                                    <div style={{fontSize: "20px", color: '#212121'}}>
                                        <strong>From: </strong>{from} <br />
                                        <strong>To: </strong>{to} <br />
                                        <strong>Value: </strong>{value} <br />
                                        <strong>Tx Hash: </strong>{hash}
                                    </div>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                );
            }): 
            <ListGroup.Item variant="warning" style={{marginTop: "10px"}}>
                <strong>There are 0 transactions in this block sending ETH </strong>
            </ListGroup.Item>}
            </div>
        );
    };

    return(
        <div className="App">
            <header className="App-header">
            <h1 className="app-title">Block Transactions</h1>
            <Container>
                <Tab.Container id="list-group-tabs-example" >
                    <Row>
                        <Col>
                            <ListGroup>
                                {screenName === BLOCKS_SCREEN ? <BlockList/> : <></>}
                                {screenName === TRANSACTIONS_SCREEN ? <TransactionList/> : <></>}
                            </ListGroup>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
            
            </header>
        </div>
    );
}

export default MainPage;