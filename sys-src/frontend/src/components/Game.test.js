import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from "./Game";


//test if test is set up correctly
test("Sanity check", () => {
    expect(true).toBe(true);
});


//Test if default value is check and the others not
describe("Test if default value is checked and the others not", () => {
    test("Test if normal is checked as default", () => {
        const component = <Game></Game>
        const {getByLabelText} = render(component);

        expect(getByLabelText()).toBeChecked();
    })

})