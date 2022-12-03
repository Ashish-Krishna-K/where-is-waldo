import { useEffect, useState } from "react";
import { Timer } from "./components/Timer";
import { Waldo } from "./components/Waldo";
import { GameOver } from "./components/GameOver";
import getTargetCoordinates from "./firebase";


function App() {
  const [time, setTime] = useState(new Date(null).toISOString());
  const [clickStatus, setClickStatus] = useState(false);
  const [range, setRange] = useState({
    leftMin: null,
    leftMax: null,
    topMin: null,
    topMax: null
  })
  const [userChoice, setUserChoice] = useState(null)
  const [userClicked, setUserClicked] = useState(false)
  const [didUserMakeCorrectChoice, setDidUserMakeCorrectChoice] = useState(false);
  const [correctChoices, setCorrectChoices] = useState([])
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!userChoice) return;
    const importedData = getTargetCoordinates(userChoice);
    importedData.then(({coordinates}) => {
      if ((coordinates.xAxis > range.leftMin && coordinates.xAxis < range.leftMax) && (coordinates.yAxis > range.topMin && coordinates.yAxis < range.topMax)) {
        setDidUserMakeCorrectChoice(true);
        setCorrectChoices(correctChoices.concat({
          name: userChoice,
          coordinates: coordinates,
        }))
      }
      setUserClicked(false)
    });
  }, [userChoice])

  useEffect(() => {
    if (correctChoices.length >= 5) {
      setIsGameOver(true)
    };
  }, [correctChoices])

  const handleUserChoice = (e) => {
    setUserChoice(e.target.dataset.name);
    // console.log(didUserMakeCorrectChoice);
  }

  const startTime = () => setClickStatus(true);
  return (
    <div className="App">
      <header>Where's Waldo?</header>
      <main>
        {
        !isGameOver ?
          <div>
            <button onClick={startTime}>Start Game!</button>
            {
              clickStatus && 
                <div> 
                  <Timer time={time} setTime={setTime}/>
                  <Waldo 
                  setRange={setRange} 
                  handleUserChoice={handleUserChoice}
                  userClicked={userClicked}
                  setUserClicked={setUserClicked}
                  correctChoices={correctChoices}
                  />
                </div>
            }
          </div> :
          <div>
            <GameOver time={time} />
          </div>  
        }
      </main>
      <footer>Project By Ashish-Krishna-K</footer>
    </div>
  );
}

export default App;
