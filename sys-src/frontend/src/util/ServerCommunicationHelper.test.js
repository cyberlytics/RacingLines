import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";
const {ServerCommunicationHelper} = require('./ServerCommunicationHelper');
import 'core-js';


//Test if object has all functions
describe("Test if serverCommunicationHelper has all functions of the class ServerCommunicationHelper", () => {
    const socket = io.connect(process.env.REACT_APP_IPAddress + ":3001");
    const serverCommunicationHelper = new ServerCommunicationHelper(socket);

    test("Test if joinRoom() is defined", () => {
        expect(typeof serverCommunicationHelper.joinRoom).toBe("function");
    })

    test("Test if sendClientPlayerState() is defined", () => {
        expect(typeof serverCommunicationHelper.sendClientPlayerState).toBe("function");
    })

    test("Test if startGame() is defined", () => {
        expect(typeof serverCommunicationHelper.startGame).toBe("function");
    })

    socket.disconnect();
})


//Test the constructor
describe("Test if constructor sets values correct", () => {
    const socket = io.connect(process.env.REACT_APP_IPAddress + ":3001");
    const serverCommunicationHelper = new ServerCommunicationHelper(socket);

    test("Test if socket from parameter is socket from serverCommunicationHelper", () => {
        expect(serverCommunicationHelper.Socket).toBe(socket);
    })

    test("Test if room is empty string", () => {
        expect(serverCommunicationHelper.room).toBe("");
    })

    socket.disconnect();
})


//Test function joinRoom()
describe("Test if joinRoom() sets values correctly", () => {
    const socket = io.connect(process.env.REACT_APP_IPAddress + ":3001");
    const serverCommunicationHelper = new ServerCommunicationHelper(socket);

    const room = "fed98b5e-5745-4b77-b7e7-95c7af287a50";

    serverCommunicationHelper.joinRoom(room);

    test("Test if room from ServerCommunicationHelper Object is room from parameter", () => {
        expect(serverCommunicationHelper.room).toBe(room);
    })

    socket.disconnect();
})


