import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerColors from "./PlayerColors";

//Test if default value is check and the others not
describe("Test if default value is checked and the others not", () => {
    test("Test if red is not checked as default", () => {
        const {getByLabelText} = render(<PlayerColors/>);

        expect(getByLabelText('Red')).not.toBeChecked();
    })

    test("Test if orange is not checked as default", () => {
        const {getByLabelText} = render(<PlayerColors/>);

        expect(getByLabelText('Orange')).not.toBeChecked();
    })

    test("Test if yellow is not checked as default", () => {
        const {getByLabelText} = render(<PlayerColors/>);

        expect(getByLabelText('Yellow')).not.toBeChecked();
    })

    test("Test if green is checked as default", () => {
      const {getByLabelText} = render(<PlayerColors/>);

      expect(getByLabelText('Green')).toBeChecked();
    })

    test("Test if blue is not checked as default", () => {
      const {getByLabelText} = render(<PlayerColors/>);

      expect(getByLabelText('Blue')).not.toBeChecked();
    })

    test("Test if purple is not checked as default", () => {
      const {getByLabelText} = render(<PlayerColors/>);

      expect(getByLabelText('Purple')).not.toBeChecked();
    })

    test("Test if pink is not checked as default", () => {
      const {getByLabelText} = render(<PlayerColors/>);

      expect(getByLabelText('Pink')).not.toBeChecked();
    })
})

//Test if checked radiobotton changes to be checked
//Test if the methos of the component gets called
describe("Test if checked radiobutton changes and method gets called", () => {
    test("Test if methos handleClientColorChanged gets called", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        fireEvent.click(getByLabelText('Red'), {target: {value: 'red'}});
        expect(parentMethod).toHaveBeenCalled();
    })

    test("Test if radiobutton gets checked when click radiobutton red", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Red')).not.toBeChecked();
        fireEvent.click(getByLabelText('Red'), {target: {value: 'red'}});

        expect(getByLabelText('Red')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton orange", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Orange')).not.toBeChecked();
        fireEvent.click(getByLabelText('Orange'), {target: {value: 'orange'}});

        expect(getByLabelText('Orange')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton yellow", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Yellow')).not.toBeChecked();
        fireEvent.click(getByLabelText('Yellow'), {target: {value: 'yellow'}});

        expect(getByLabelText('Yellow')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton green", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        //check red first since green is default
        fireEvent.click(getByLabelText('Red'), {target: {value: 'red'}});
        expect(getByLabelText('Green')).not.toBeChecked();
        fireEvent.click(getByLabelText('Green'), {target: {value: 'green'}});

        expect(getByLabelText('Green')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton blue", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Blue')).not.toBeChecked();
        fireEvent.click(getByLabelText('Blue'), {target: {value: 'blue'}});

        expect(getByLabelText('Blue')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton purple", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Purple')).not.toBeChecked();
        fireEvent.click(getByLabelText('Purple'), {target: {value: 'purple'}});

        expect(getByLabelText('Purple')).toBeChecked();
    })

    test("Test if radiobutton gets checked when click radiobutton pink", () => {
        const parentMethod = jest.fn();

        const {getByLabelText} = render(<PlayerColors parentMethod={parentMethod}/>);
        expect(getByLabelText('Pink')).not.toBeChecked();
        fireEvent.click(getByLabelText('Pink'), {target: {value: 'pink'}});

        expect(getByLabelText('Pink')).toBeChecked();
    })

})