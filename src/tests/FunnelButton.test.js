import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import FunnelButton from "../components/FunnelButton";

describe('<FunnelButton/>', () => {
    const transaction = { 
        hash: '0x60ec325b5bbf071fd8459f02602e2d016c707bf70a0ccbefc2f205e2d651a3e5', 
        from: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', 
        to: '0x79014E3f67F9c2fb1B602f07a9AC281Eb0e801E4', 
        value: '50000'
    };
    const funnelProps = { 
        seletedBlockData: {number: 9999, transactions: ['']},
        setTransactions: () =>{},
        setSeletedBlockData: () =>{},
        transactions: [transaction],
        web3: {},
        setFilterByAddress: ()=>{},
        account: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d',

    };
    test('renders funnel button when passing filter', () => {
        const component = render(
            <FunnelButton 
                seletedBlockData={funnelProps.seletedBlockData}
                setTransactions={funnelProps.setTransactions}
                setSeletedBlockData={funnelProps.setSeletedBlockData}
                transactions={funnelProps.transactions}
                web3={funnelProps.web3}
                filterByAddress={true}
                setFilterByAddress={funnelProps.setFilterByAddress}
                account={funnelProps.account}
            />
        );
        expect(component.container).toBeDefined();
    });

    test('renders funnel button when not passing filter', () => {
        const component = render(
            <FunnelButton 
                seletedBlockData={funnelProps.seletedBlockData}
                setTransactions={funnelProps.setTransactions}
                setSeletedBlockData={funnelProps.setSeletedBlockData}
                transactions={funnelProps.transactions}
                web3={funnelProps.web3}
                filterByAddress={false}
                setFilterByAddress={funnelProps.setFilterByAddress}
                account={funnelProps.account}
            />
        );
        expect(component.container).toBeDefined();
    });

    test('renders funnel button when not passing filter', () => {
        const component = render(
            <FunnelButton 
                seletedBlockData={funnelProps.seletedBlockData}
                setTransactions={funnelProps.setTransactions}
                setSeletedBlockData={funnelProps.setSeletedBlockData}
                transactions={funnelProps.transactions}
                web3={funnelProps.web3}
                filterByAddress={false}
                setFilterByAddress={funnelProps.setFilterByAddress}
                account={funnelProps.account}
            />
        );
        expect(component.container).toBeDefined();
    });

    describe('unfilled button',() => {
        test('clicking funnel buttom calls setTransactions event handler once', () => {
            const setTransactions = jest.fn();
            const component = render(
                <FunnelButton 
                    seletedBlockData={funnelProps.seletedBlockData}
                    setTransactions={setTransactions}
                    setSeletedBlockData={funnelProps.setSeletedBlockData}
                    transactions={funnelProps.transactions}
                    web3={funnelProps.web3}
                    filterByAddress={false}
                    setFilterByAddress={funnelProps.setFilterByAddress}
                    account={funnelProps.account}
                />
            );
            const funnel = component.getByTestId('funnel-unfilled');
            
            fireEvent.click(funnel);
            expect(setTransactions).toHaveBeenCalledTimes(1);
        });

        test('clicking funnel buttom calls setFilterByAddress event handler once', () => {
            const setFilterByAddress = jest.fn();
            const component = render(
                <FunnelButton 
                    seletedBlockData={funnelProps.seletedBlockData}
                    setTransactions={funnelProps.setTransactions}
                    setSeletedBlockData={funnelProps.setSeletedBlockData}
                    transactions={funnelProps.transactions}
                    web3={funnelProps.web3}
                    filterByAddress={false}
                    setFilterByAddress={setFilterByAddress}
                    account={funnelProps.account}
                />
            );
            const funnel = component.getByTestId('funnel-unfilled');
            
            fireEvent.click(funnel);
            expect(setFilterByAddress).toHaveBeenCalledTimes(1);
        });

        test('filled funnel is hidden when filtering is off', () => {
            const { queryByTestId } = render(
                <FunnelButton 
                    seletedBlockData={funnelProps.seletedBlockData}
                    setTransactions={funnelProps.setTransactions}
                    setSeletedBlockData={funnelProps.setSeletedBlockData}
                    transactions={funnelProps.transactions}
                    web3={funnelProps.web3}
                    filterByAddress={false}
                    setFilterByAddress={funnelProps.setFilterByAddress}
                    account={funnelProps.account}
                />
            );
            expect(queryByTestId('funnel-filled')).toBeNull();
        });
    });

    describe('filled button',() => {
        test('renders filled button ', () => {
            const setTransactions = jest.fn();
            const component = render(
                <FunnelButton 
                    seletedBlockData={funnelProps.seletedBlockData}
                    setTransactions={setTransactions}
                    setSeletedBlockData={funnelProps.setSeletedBlockData}
                    transactions={funnelProps.transactions}
                    web3={funnelProps.web3}
                    filterByAddress={true}
                    setFilterByAddress={funnelProps.setFilterByAddress}
                    account={funnelProps.account}
                />
            );
            const funnel = component.getByTestId('funnel-filled');
            expect(funnel).toBeDefined();
        });

        test('unfilled funnel is hidden when filtering is on', () => {
            const { queryByTestId } = render(
                <FunnelButton 
                    seletedBlockData={funnelProps.seletedBlockData}
                    setTransactions={funnelProps.setTransactions}
                    setSeletedBlockData={funnelProps.setSeletedBlockData}
                    transactions={funnelProps.transactions}
                    web3={funnelProps.web3}
                    filterByAddress={true}
                    setFilterByAddress={funnelProps.setFilterByAddress}
                    account={funnelProps.account}
                />
            );
            expect(queryByTestId('funnel-unfilled')).toBeNull();
        });

    });
    
})
