import React, {useEffect, useState, useRef, Component} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
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
import  socket  from './util/socketConfig';

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


    const Lobby = () => {

    const classes = useStyles();

    const [playerList,setPlayerList] = useState([{
        Id: socket.id,
        Name: "player",
        PlayerColor: "green",
        LineColor: "black",
        CanvasSize: "medium",
        GameTempo: "normal",
        Score: 0
    }]);

    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");
    const clientNameRef = useRef();


    useEffect(() => {
        //removes the socket from the room it was last connected to
        const clearRoom = () => {
            socket.emit("clearRoom", {});
        };
        clearRoom();

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
        socket.on('onCanvasSizeChanged', (data) => {
            setPlayerList(data.joinedPlayers);
        });
        socket.on('onGameTempoChanged', (data) => {
            setPlayerList(data.joinedPlayers);
        });
        socket.on('startGame', (data) => {
            let route = "/Game?room=" + room;
            navigate(route, {});
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

        function handleClientColorChanged(event){
            const newPlayerList = {...playerList};
            console.log(newPlayerList[socket.id].PlayerColor);
            newPlayerList[socket.id].PlayerColor = event.target.value;
            setPlayerList(newPlayerList);
            console.log(newPlayerList[socket.id].PlayerColor);
            socket.emit("playerColorChanged", {playerList, room});
        }

        function handleCanvasSizeChanged(event){
            const newPlayerList = {...playerList};
            console.log(newPlayerList[socket.id].CanvasSize);
            newPlayerList[socket.id].CanvasSize = event.target.value;
            setPlayerList(newPlayerList);
            console.log(newPlayerList[socket.id].CanvasSize);
            socket.emit("canvasSizeChanged", {playerList, room});
        }

        function handleGameTempoChanged(event){
            const newPlayerList = {...playerList};
            console.log(newPlayerList[socket.id].GameTempo);
            newPlayerList[socket.id].GameTempo = event.target.value;
            setPlayerList(newPlayerList);
            console.log(newPlayerList[socket.id].GameTempo);
            socket.emit("gameTempoChanged", {playerList, room});
        }

        const navigate = useNavigate();
        function startGame(event){
            socket.emit("clickedPlay", {room});
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
                                        <CanvasSize parentMethod={handleCanvasSizeChanged}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper style={grid_classes.paper}>
                                        <GameTempo parentMethod={handleGameTempoChanged}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper style={grid_classes.paper}>
                                        <PlayerColors parentMethod={handleClientColorChanged}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={startGame} variant="contained" className={classes.button} color="primary" type="button">Play</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
}; export default Lobby;
