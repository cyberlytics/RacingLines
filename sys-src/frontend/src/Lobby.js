import React, {useEffect, useState, Component} from 'react';
import {useSearchParams} from "react-router-dom";
import io from 'socket.io-client';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { render } from "react-dom";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const socket = io.connect("http://localhost:3001");

const Lobby = () => {
    const classes = useStyles();

    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");

    const [number, setNumber] = useState(0);

    const joinRoom = () => {
        if (roomParam.get("room") !== "") {
            socket.emit("join_room", room);
        }
    };
    joinRoom();

    function handleAddButtonClick() {
        setNumber(number+1);
    }

    function handleResetButtonClick() {
        setNumber(0);
    }

    const sendMessage = () => {
        socket.emit("send_message", {number, room});
        console.log(number);
    };

    useEffect(() => {
        sendMessage();
    }, [number])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setNumber(data.number);
        });
    }, [socket])

    return (
        <div>
            <div className={classes.paper}>
                <h1>Counter</h1>
                <h1>{number}</h1></div>
            <div className={classes.button}>
                <Button variant="contained" className={classes.button} color="primary" type="button"
                        onClick={handleAddButtonClick}>add</Button>
                <Button variant="contained" color="secondary" type="button" onClick={handleResetButtonClick}>reset</Button>
            </div>
        </div>
    );

    
}

export default Lobby;