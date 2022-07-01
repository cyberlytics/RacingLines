import {render, act, fireEvent, createEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Scoreboard from "./Scoreboard";
import 'core-js';

import io from "socket.io-client";

const {GameManager} = require('../util/GameManager');
const {Player} = require('../util/Player');

//test if test is set up correctly
test("Sanity check", () => {
    expect(true).toBe(true);
});

//Test if object has all functions
describe("Test if scoreboard updates correctly when player score changes", () => {
    const gameManager = new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.addScore(0);
    gameManager.addplayer(player);

    test("Test if player element gets created.", () => {
        const {getByTestId} = render(<Scoreboard gameManager={gameManager}/>);
        expect(getByTestId(player.id)).toBeTruthy()
    })

    test("Test if name of player is correct.", () => {
        const {getByTestId} = render(<Scoreboard gameManager={gameManager}/>);
        expect(getByTestId(player.id+"name")).toHaveTextContent(player.name);
    })

    test("Test if score is set correctly.", () => {
        const {getByTestId} = render(<Scoreboard gameManager={gameManager}/>);
        expect(getByTestId(player.id+"score")).toHaveTextContent("0");
    })

    test("Test if score changes correctly.", () => {
        const {getByTestId} = render(<Scoreboard gameManager={gameManager}/>);
        const testplayer = new Player("testChange", 2, "pink", "blue", 200, 200, Math.PI);
        act(() => {
            gameManager.addplayer(testplayer);
            testplayer.addScore(10);
        });

        expect(getByTestId(testplayer.id+"score")).toHaveTextContent("10")

        act(() => {
            testplayer.addScore(10);
        });

        expect(getByTestId(testplayer.id+"score")).toHaveTextContent("20");
    })

    test("Test add new player.", () => {
        const {getByTestId} = render(<Scoreboard gameManager={gameManager}/>);
        const newplayer = new Player("new", 2, "pink", "blue", 200, 200, Math.PI);

        act(() => {
            gameManager.addplayer(newplayer);
            newplayer.addScore(10);
        });

        expect(getByTestId(newplayer.id)).toBeTruthy();
        expect(getByTestId(newplayer.id+"name")).toHaveTextContent(newplayer.name);
        expect(getByTestId(newplayer.id+"score")).toHaveTextContent("10");
    })
});



