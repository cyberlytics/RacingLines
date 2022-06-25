import React, {useEffect, useState, useRef, Component} from 'react';
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
      color: "blue",
      textAlign: "left",
      fontFamily: "Roboto"
    }
  };
    const socket = io.connect(process.env.REACT_APP_IPAddress+":3001");


    const Lobby = () => {

    const classes = useStyles();

    const [playerList,setPlayerList] = useState([]);

    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");
    const clientNameRef = useRef();

    useEffect(() => {

        const joinRoom = () => {
            if (room !== "") {
                socket.emit("join_lobby", {room});
                console.log("joined room");
            }
        };
        joinRoom();
    }, [roomParam]);

    useEffect(() => {
        socket.on('onPlayerJoin', data => {
            //console.log(data.joinedPlayers);
            setPlayerList(data.joinedPlayers);
        });
        socket.on('onPlayerLeave', (data) => {
            setPlayerList(data.joinedPlayers);
        });
        socket.on('onPlayerNameChanged', (data) => {
            setPlayerList(data.joinedPlayers);
            console.log(data.joinedPlayers.Name)
        });
        socket.on('onPlayerColorChanged', (data) => {
            setPlayerList(data.joinedPlayers);
        });
    }, [socket]);

    useEffect(() => {
        return  Object.keys(playerList).map((item,index) => {
            return(
                <option value={playerList[item].Id} key={index}>
                    {playerList[item].Name}
                </option>
            )
        })
        //add a TextField for the player in the jsx below



   }, [playerList]);

        function handleClientNameChanged(event){
            const newPlayerList = {...playerList};
            console.log(newPlayerList[socket.id].Name);
            newPlayerList[socket.id].Name = event.target.value;
            setPlayerList(newPlayerList);
            console.log(newPlayerList[socket.id].Name);
            socket.emit("playerNameChanged", {playerList, room});
        }

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

                                <ul>{Object.keys(playerList).map((item,index) => {
                                    if(item===socket.id)return(
                                        <li key={item} style={{color: playerList[item].PlayerColor, fontSize: 35}}>
                                            <Paper style={grid_classes.player}>
                                            <TextField id={item} value={playerList[item].Name} variant="outlined" onChange={handleClientNameChanged}/>
                                            </Paper>
                                        </li>
                                    )
                                    else return(
                                        <li key={item} style={{color: playerList[item].PlayerColor, fontSize: 35}}>
                                            <Paper style={grid_classes.player}>
                                            <TextField id={item} value={playerList[item].Name} variant="outlined" disabled={true}/>
                                        </Paper>
                                        </li>
                                    )})}
                                </ul>
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
}; export default Lobby;