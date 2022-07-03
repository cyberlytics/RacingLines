import {render, act, fireEvent, createEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from "react";
import SnackBarField from "./SnackBarField";
import 'core-js';



//test if test is set up correctly
test("Sanity check", () => {
    expect(true).toBe(true);
});

//Test if object has all functions
describe("Test if Snackbar closes when close is clicked", () => {


    test("Test if Snackbar starts visible", () => {
        const {getByTestId} = render(<SnackBarField/>);

        expect(getByTestId('snackbar')).toBeTruthy();
        expect(getByTestId('snackbar')).toBeVisible();

    })

    test("Test if Snackbar gets invisible on close", () => {
        const {getByTestId} = render(<SnackBarField/>);

        expect(getByTestId('snackbar')).toBeTruthy();
        expect(getByTestId('snackbar')).toBeVisible();
        fireEvent.click(getByTestId("closeButton"), {});
        expect(getByTestId('snackbar')).not.toBeVisible();
    })
});




