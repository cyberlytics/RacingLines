import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import GameTempo from "./GameTempo";

//Test if default value is check and the others not
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

//Test if checked radiobotton changes to be checked
//Test if the methos of the component gets called
describe("Test if checked radiobutton changes and method gets called", () => {
    test("Test if methos handleGameTempoChanged gets called", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Fast'), {target: {value: 'fast'}});
        expect(parentMethod).toHaveBeenCalled();

    })

    test("Test if radiobutton gets checked when click radiobutton fast", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        expect(getByLabelText('Fast')).not.toBeChecked();
        fireEvent.click(getByLabelText('Fast'), {target: {value: 'fast'}});

        expect(getByLabelText('Fast')).toBeChecked();
    })
    
    test("Test if radiobutton gets checked when click radiobutton slow", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        expect(getByLabelText('Slow')).not.toBeChecked();
        fireEvent.click(getByLabelText('Slow'), {target: {value: 'slow'}});
        
        expect(getByLabelText('Slow')).toBeChecked();
    })
    
    test("Test if radiobutton gets checked when click radiobutton normal", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<GameTempo parentMethod={parentMethod}/>);
        //check slow first since normal is default
        fireEvent.click(getByLabelText('Slow'), {target: {value: 'slow'}});
        expect(getByLabelText('Normal')).not.toBeChecked();
        fireEvent.click(getByLabelText('Normal'), {target: {value: 'normal'}});
        
        expect(getByLabelText('Normal')).toBeChecked();
    })
})