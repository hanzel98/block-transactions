/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Container, Tab, Row, Col, ListGroup } from 'react-bootstrap';
import getWeb3 from '../helpers/getWeb3Connection';
import { getLatestBlocks } from '../helpers/transactions';
import { BLOCKS_SCREEN, TRANSACTIONS_SCREEN } from '../constants/types';
import BlockList from './BlockList';
import TransactionList from './TransactionList';
import '../App.css';

const MainPage = () => {
  const [web3, setWeb3] = useState({});
  const [account, setAccount] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [seletedBlockData, setSeletedBlockData] = useState({});
  const [screenName, setScreenName] = useState(BLOCKS_SCREEN);

  // Update the latest blocks every fixed period of time.
  const blockUpdater = web3Connection => {
    const refreshPeriod = process.env.REACT_APP_REFRESH_PERIOD || 5000;
    if (Object.keys(web3Connection).length === 0) return;
    setInterval(async () => {
      if (Object.keys(web3Connection).length > 0) {
        const latestsBlocks = await getLatestBlocks(web3Connection);
        setBlocks(latestsBlocks);
      }
    }, refreshPeriod);
  };

  useEffect(() => {
    async function fetchWeb3() {
      // Get network provider and web3 instance.
      const web3Connection = await getWeb3();
      setWeb3(web3Connection);
      const accounts = await web3Connection.eth.getAccounts();
      const latestsBlocks = await getLatestBlocks(web3Connection);
      setBlocks(latestsBlocks);
      setAccount(accounts[0]);
      blockUpdater(web3Connection);
    }
    fetchWeb3();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Block Transactions</h1>
        <Container>
          <Tab.Container id="list-group-tabs-example">
            <Row>
              <Col>
                <ListGroup>
                  {screenName === BLOCKS_SCREEN ? (
                    <BlockList
                      setTransactions={setTransactions}
                      setScreenName={setScreenName}
                      setSeletedBlockData={setSeletedBlockData}
                      web3={web3}
                      blocks={blocks}
                    />
                  ) : (
                    <></>
                  )}
                  {screenName === TRANSACTIONS_SCREEN ? (
                    <TransactionList
                      account={account}
                      seletedBlockData={seletedBlockData}
                      setTransactions={setTransactions}
                      setScreenName={setScreenName}
                      setSeletedBlockData={setSeletedBlockData}
                      transactions={transactions}
                      web3={web3}
                    />
                  ) : (
                    <></>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </header>
    </div>
  );
};

export default MainPage;
