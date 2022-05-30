import './App.css';
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
}


export default App;
