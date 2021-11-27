import React from 'react';
import { connectWeb3 } from '../helpers/web3Connection';
import '../App.css';

const MainPage = props => {
    connectWeb3();

    return(
        <div className="App">
            <header className="App-header">
                <h1 className="app-title">Block Transactions</h1> 
            </header>
        </div>
    );
}

export default MainPage;