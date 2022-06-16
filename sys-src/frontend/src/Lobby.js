import React, {useEffect, useState, useRef} from 'react';
import {useSearchParams} from "react-router-dom";
import io from 'socket.io-client';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CopyLink from "./components/CopyLink";
import CanvasSize from "./components/CanvasSize";
import GameTempo from "./components/GameTempo";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlayerColors from './components/PlayerColors';
import { TextField } from '@material-ui/core';


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
    },
    player:{
      padding: 20,
      marginBottom: 10,
      textAlign: "left",
      color: "blue",
      fontFamily: "Roboto"
    }
  };

const socket = io.connect(process.env.REACT_APP_IPAddress+":3001");


const Lobby = () => {
    const classes = useStyles();
    const name = useRef();

    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");

    const [number, setNumber] = useState(0);

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_lobby", {room});
            console.log("joined room");
            console.log(room);
        }
    };
    joinRoom();

    {/*}
    function handleAddButtonClick() {
        setNumber(number+1);
    }

    function handleResetButtonClick() {
        setNumber(0);
    }
*/}
    //communication with server
    const sendMessage = () => {
        socket.emit("send_message", {number, room});
        console.log(number);

    };

    function handleNameChange() {
        socket.emit("nameChanged", {name});
        console.log(name);
    }

    useEffect(() => {
        sendMessage();
    }, [number])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setNumber(data.number);
        });

        socket.on("playerJoined", (data) => {
            console.log("playerJoined");
            let newPaper = React.createElement(<Paper></Paper>);
            console.table(data);
            let newTextBox = React.createElement(<TextField></TextField>);
            document.getElementById("playerNames").appendChild();
        });

        socket.on("on_join", (data) => {
            data.joinedPlayers.forEach(player => {
                /*let newPaper = React.createElement(<Player/>);
                document.getElementById("Player").appendChild(newPaper);*/
                console.log(player);
            });
        });

        socket.on("on_leave", (data) => {});

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
                
                <Grid id="playerNames" item xs={12} sm={6}>
                    <Paper style={grid_classes.player}>
                        <ul>

                        <li>
                        <TextField background="blue" id="outlined-basic" label="Your Playername" variant="outlined" onChange={handleNameChange} ref={name}/>
                        </li>
                        {/*<div className={classes.paper}>
                            <h1>Counter</h1>
                            <h1>{number}</h1></div>
                        <div className={classes.button}>
                            <Button variant="contained" className={classes.button} color="primary" type="button"
                                    onClick={handleAddButtonClick}>add</Button>
                            <Button variant="contained" color="secondary" type="button" onClick={handleResetButtonClick}>reset</Button>
                        </div> */}
                        
                        </ul>
                    </Paper>
                    
                </Grid>
                
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper style={grid_classes.paper}>
                                <CanvasSize/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper style={grid_classes.paper}>
                                <GameTempo/>
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