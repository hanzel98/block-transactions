import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TransactionList from "../components/TransactionList";

describe('<TransactionList/>', () => {
    const transaction = { 
        hash: '0x60ec325b5bbf071fd8459f02602e2d016c707bf70a0ccbefc2f205e2d651a3e5', 
        from: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', 
        to: '0x79014E3f67F9c2fb1B602f07a9AC281Eb0e801E4', 
        value: '50000'
    };
    const transactionListProps = { 
        account: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d',
        seletedBlockData: {number: 9999, transactions: ['']},
        setTransactions: () =>{},
        setScreenName: () =>{},
        setSeletedBlockData: () =>{},
        transactions: [transaction],
        web3: {},
    };

    test('renders transaction list', () => {
        const component = render(
            <TransactionList 
                account={transactionListProps.account}
                seletedBlockData={transactionListProps.seletedBlockData}
                setTransactions={transactionListProps.setTransactions}
                setScreenName={transactionListProps.setScreenName}
                setSeletedBlockData={transactionListProps.setSeletedBlockData}
                transactions={transactionListProps.transactions}
                web3={transactionListProps.web3}
            />
        );
        expect(component.container).toBeDefined();
    });

    test('renders empty transactions message', () => {
        const component = render(
            <TransactionList 
                account={transactionListProps.account}
                seletedBlockData={transactionListProps.seletedBlockData}
                setTransactions={transactionListProps.setTransactions}
                setScreenName={transactionListProps.setScreenName}
                setSeletedBlockData={transactionListProps.setSeletedBlockData}
                transactions={[]}
                web3={transactionListProps.web3}
            />
        );
        const expectText = "There are 0 transactions in this block sending ETH";
        expect(component.container).toHaveTextContent(expectText);
    });

    test('should not render empty transactions message', () => {
        const component = render(
            <TransactionList 
                account={transactionListProps.account}
                seletedBlockData={transactionListProps.seletedBlockData}
                setTransactions={transactionListProps.setTransactions}
                setScreenName={transactionListProps.setScreenName}
                setSeletedBlockData={transactionListProps.setSeletedBlockData}
                transactions={transactionListProps.transactions}
                web3={transactionListProps.web3}
            />
        );
        const expectText = "There are 0 transactions in this block sending ETH";
        expect(component.container).not.toHaveTextContent(expectText);
    });
})
