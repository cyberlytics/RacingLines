import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Game from "./components/Game";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route path="/Lobby" element={<Game />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
