import {render, act, fireEvent, screen, createEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Lobby from "./Lobby";
import 'core-js';

import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'


//test if test is set up correctly
test("Sanity check", () => {
    expect(true).toBe(true);
});

//Test if object has all functions
describe("Test if the inputfields initialize correctly", () => {

    test('test if playername is player', () => {

        const history = createMemoryHistory()
        const route = '/Lobby?room=1234'
        history.push(route)
        const {getByTestId} = render(
            <Router location={history.location} navigator={history}>
                <Lobby></Lobby>
            </Router>,
        );


        expect(document.querySelector("li input")).toHaveValue("player");
    })

});
