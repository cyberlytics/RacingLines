import './App.css';
import {Route, Routes} from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";
import Game from "./components/Game";
import PixiGame from "./components/PixiGame";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/Home" element={<Home/>}/>
                <Route path="/Lobby" element={<Game/>}/>
                <Route path="*" element={<Home/>}/>
                <Route path="/PixiGame" element={<PixiGame/>}/>
            </Routes>
        </div>
    );
}

export default App;
