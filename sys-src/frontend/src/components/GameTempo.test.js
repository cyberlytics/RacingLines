import {render, fireEvent, createEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import GameTempo from "./GameTempo";

describe("Test if default value is checked and the others not", () => {
    test("Test if normal is checked as default", () => {
        const {getByLabelText} = render(<GameTempo/>);

        expect(getByLabelText('Normal')).toBeChecked();
    })
    test("Test if slow is not checked as default", () => {
        const {getByLabelText} = render(<GameTempo/>);

        expect(getByLabelText('Slow')).not.toBeChecked();
    })
    test("Test if fast is not checked as default", () => {
        const {getByLabelText} = render(<GameTempo/>);

        expect(getByLabelText('Fast')).not.toBeChecked();
    })
})

describe("Test if checked radiobutton changes and method gets called", () => {
    test("Test if methos handleGameTempoChanged gets called", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Fast'), {target: {value: 'fast'}});
        expect(parentMethod).toHaveBeenCalled();

    })
    test("Test if checked radiobutton changes when click radiobutton for fast", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Fast'), {target: {value: 'fast'}});

        expect(getByLabelText('Fast')).toBeChecked();
    })
    test("Test if checked radiobutton changes when click radiobutton for slow", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Slow'), {target: {value: 'slow'}});
        
        expect(getByLabelText('Slow')).toBeChecked();
    })
    test("Test if checked radiobutton changes when click radiobutton for normal", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Normal'), {target: {value: 'normal'}});
        
        expect(getByLabelText('Normal')).toBeChecked();
    })
})