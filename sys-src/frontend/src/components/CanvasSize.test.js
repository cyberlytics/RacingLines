import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import CanvasSize from "./CanvasSize";

//Test if default value is check and the others not
describe("Test if default value is checked and the others not", () => {
    test("Test if medium is checked as default", () => {
        const {getByLabelText} = render(<CanvasSize/>);

        expect(getByLabelText('Medium')).toBeChecked();
    })

    test("Test if small is not checked as default", () => {
        const {getByLabelText} = render(<CanvasSize/>);

        expect(getByLabelText('Small')).not.toBeChecked();
    })

    test("Test if large is not checked as default", () => {
        const {getByLabelText} = render(<CanvasSize/>);

        expect(getByLabelText('Large')).not.toBeChecked();
    })
})

//Test if checked radiobotton changes to be checked
//Test if the methos of the component gets called
describe("Test if checked radiobutton changes and method gets called", () => {
    test("Test if methos handleGameTempoChanged gets called", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<CanvasSize parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Small'), {target: {value: 'small'}});
        expect(parentMethod).toHaveBeenCalled();

    })

    test("Test if radiobutton gets checked when click radiobutton small", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<CanvasSize parentMethod={parentMethod}/>);
        expect(getByLabelText('Small')).not.toBeChecked();
        fireEvent.click(getByLabelText('Small'), {target: {value: 'small'}});

        expect(getByLabelText('Small')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton large", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<CanvasSize parentMethod={parentMethod}/>);
        expect(getByLabelText('Large')).not.toBeChecked();
        fireEvent.click(getByLabelText('Large'), {target: {value: 'large'}});
        
        expect(getByLabelText('Large')).toBeChecked();
    })
    test("Test if radiobutton gets checked when click radiobutton medium", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<CanvasSize parentMethod={parentMethod}/>);
        //check large first since medium is default
        fireEvent.click(getByLabelText('Large'), {target: {value: 'large'}});
        expect(getByLabelText('Medium')).not.toBeChecked();
        fireEvent.click(getByLabelText('Medium'), {target: {value: 'medium'}});
        
        expect(getByLabelText('Medium')).toBeChecked();
    })
})