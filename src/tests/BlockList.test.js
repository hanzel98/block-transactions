import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import BlockList from "../components/BlockList";

describe('<BlockList/>', () => {
    const block1 = { 
        number: 100001,
        transactions: ['0x60ec325b5bbf071fd8459f02602e2d016c707bf70a0ccbefc2f205e2d651a3e5'],
    };
    const block2 = { 
        number: 100002,
        transactions: ['0x60ec325b5bbf071fd8459f02602e2d016c707bf70a0ccbefc2f205e2d651a3e5'],
    };
    const transactionProps = { 
        blocks: [block1, block2],
        setTransactions: () =>{},
        setScreenName: () =>{},
        setSeletedBlockData: () =>{},
        web3: {},
    };
    let component;
    beforeEach(()=>{
        component = render(
            <BlockList 
                blocks={transactionProps.blocks}
                setTransactions={transactionProps.setTransactions}
                setScreenName={transactionProps.setScreenName}
                setSeletedBlockData={transactionProps.setSeletedBlockData}
                web3={transactionProps.web3}
            />
        );
    });

    test('renders block list', () => {
        expect(component.container).toBeDefined();
    });

    test('renders two blocks', () => {
        const expectedText1 = `Read Block #${block1.number}`;
        expect(component.container).toHaveTextContent(expectedText1);

        const expectedText2 = `Read Block #${block2.number}`;
        expect(component.container).toHaveTextContent(expectedText2);
    });
})
