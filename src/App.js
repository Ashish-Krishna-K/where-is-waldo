import { useState } from "react";
import { Timer } from "./components/Timer";
import { Waldo } from "./components/Waldo";

function App() {
  const [clickStatus, setClickStatus] = useState(false);

  const startTime = () => setClickStatus(true);

  return (
    <div className="App">
      <header>Where's Waldo?</header>
      <main>
        <button onClick={startTime}>Start Game!</button>
        {clickStatus && 
          <div> 
            <Timer />
            <Waldo />
          </div>
          }
      </main>
      <footer>Project By Ashish-Krishna-K</footer>
    </div>
  );
}

export default App;
