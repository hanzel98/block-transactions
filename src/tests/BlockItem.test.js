import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlockItem from "../components/BlockItem";

describe('<BlockItem/>', () => {

    test('renders block list', () => {
        const blockProp = { number: 12345678 };
        const blockSelectedProp = () => {};
        const component = render(
            <BlockItem block={blockProp} blockSelected={blockSelectedProp}/>
        );
        expect(component.container).toBeDefined();
    });

    test('renders block item', () => {
        const blockProp = { number: 12345678 };
        const blockSelectedProp = () => {};
        const component = render(
            <BlockItem block={blockProp} blockSelected={blockSelectedProp}/>
        );
        const expectedText = `Read Block #${blockProp.number}`;
        expect(component.container).toHaveTextContent(expectedText);
    });
    
    
    test('clicking buttom calls event handler once', () => {
        const blockProp = { number: 12345678 };
        const mockHandler = jest.fn();
        const component = render(
            <BlockItem block={blockProp} blockSelected={mockHandler}/>
        );
        const expectedText = `Read Block #${blockProp.number}`;
        const listItem = component.getByText(expectedText);
        fireEvent.click(listItem);
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

})
