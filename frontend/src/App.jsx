import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from './Pages/StartScreen';
import GameScreen from "./Pages/GameScreen";
import BiddingScreen from "./Pages/BiddingScreen"
import TrumpScreen from "./Pages/TrumpScreen";
import './App.css'
import Layout from "./Layout";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<StartScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/bidding" element={<BiddingScreen />} />
          <Route path="/trump" element={<TrumpScreen />} />
        </Route>
      </Routes>
    </Router>
  );



}

export default App;








