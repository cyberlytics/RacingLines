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

