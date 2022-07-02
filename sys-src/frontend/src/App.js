import './App.css';
import {Route, Routes} from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";
import Game from "./components/Game";
import Snackbar from "./components/SnackBarField";
import React, { Component } from "react";



const App = () => {
  
   return (
        <div>
            <Routes>
                <Route exact path="/Home" element={<Home/>}/>
                <Route path="/Game" element={[<Snackbar/>, <Game/>]}/>
                <Route path="/Lobby" element={<Lobby/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes> 
        </div>
    );
}


export default App;
