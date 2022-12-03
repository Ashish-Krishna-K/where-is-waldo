import { useState } from "react";
import { Timer } from "./components/Timer";
import { Waldo } from "./components/Waldo";
import getTargetCoordinates from "./firebase";

const importedData = getTargetCoordinates();
const targetCoordinates = {};
importedData.then((data) => Object.assign(targetCoordinates, data[0]));

function App() {
  const [clickStatus, setClickStatus] = useState(false);

  const startTime = () => setClickStatus(true);
  console.log(targetCoordinates);
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
