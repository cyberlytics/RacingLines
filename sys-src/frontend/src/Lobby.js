import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import io from 'socket.io-client';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CopyLink from "./components/CopyLink";
import DifficultyLevel from "./components/DifficultyLevel";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlayerColors from './components/PlayerColors';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
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


//create our styles
const grid_classes = {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: 20,
      textAlign: "left",
      color: "blue",
      fontFamily: "Roboto"
    }
  };

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
    //communication with server
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
            
            <div style={grid_classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={grid_classes.paper}>
                        <CopyLink/>
                    </Paper>
                </Grid>
                {/*This item will be 12 units on extra small screens */}
                {/*But will be 6 units on small screens */}
                
                <Grid item xs={12} sm={6}>
                    <Paper style={grid_classes.paper}>
                        <div className={classes.paper}>
                            <h1>Counter</h1>
                            <h1>{number}</h1></div>
                        <div className={classes.button}>
                            <Button variant="contained" className={classes.button} color="primary" type="button"
                                    onClick={handleAddButtonClick}>add</Button>
                            <Button variant="contained" color="secondary" type="button" onClick={handleResetButtonClick}>reset</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper style={grid_classes.paper}>
                                <DifficultyLevel/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper style={grid_classes.paper}>
                                <PlayerColors/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" className={classes.button} color="primary" type="button">Play</Button>
                        </Grid>
                    </Grid>
                </Grid>                                                              
            </Grid>
            </div>
        </div>
    );
}

export default Lobby;