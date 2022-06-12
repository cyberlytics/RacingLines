import './App.css';
<<<<<<< HEAD
import Canvas from './components/Canvas';
import KeyBindings from './components/KeyBindings';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Racing Lines</h1>
        <Canvas/>
         </header>
     <KeyBindings/>
    </div>
  );
=======
import {Route, Routes} from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/Home" element={<Home/>}/>
                <Route path="/Lobby" element={<Lobby/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>
    );
>>>>>>> 9c8f0c6f527a485bf8ee42c7dacb826c951f0245
}


export default App;
