import './App.css';
import {Route, Routes} from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";
import Game from "./components/Game";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/Home" element={<Home/>}/>
                <Route path="/Lobby" element={<Lobby/>}/>
                <Route path="/Game" element={<Game/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
