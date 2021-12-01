import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TransactionElement from "../components/TransactionElement";

describe('<TransactionElement/>', () => {
    const transactionProps = { 
        hash: '0x60ec325b5bbf071fd8459f02602e2d016c707bf70a0ccbefc2f205e2d651a3e5', 
        from: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', 
        to: '0x79014E3f67F9c2fb1B602f07a9AC281Eb0e801E4', 
        value: '50000'
    };
    let component;
    beforeEach(()=> {
        component = render(
            <TransactionElement 
                hash={transactionProps.hash}
                from={transactionProps.from} 
                to={transactionProps.to} 
                value={transactionProps.value} 
            />
        );
    });
    test('shows the provided hash', () => {
        expect(component.container).toHaveTextContent(transactionProps.hash);
    });

    test('shows the provided from address', () => {
        expect(component.container).toHaveTextContent(transactionProps.from);
    });

    test('shows the provided to address', () => {
        expect(component.container).toHaveTextContent(transactionProps.to);
    });

    test('shows the provided value', () => {
        expect(component.container).toHaveTextContent(transactionProps.value);
    });

})
