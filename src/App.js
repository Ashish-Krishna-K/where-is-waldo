import { useEffect, useState } from "react";
import { Timer } from "./components/Timer";
import { Waldo } from "./components/Waldo";
import { SubmitScore } from "./components/SubmitScore";
import { getTargetCoordinates, submitScoresToLeaderBoard, getCurrentLeaderBoard } from "./firebase";
import { Leaderboard } from "./components/Leaderboard";


function App() {
  // below state handles stopwatch for timing
  const [time, setTime] = useState(new Date(null).toISOString());
  // below state is used to conditionally render the game image when user clicks on start
  const [startGame, setStartGame] = useState(false);
  // below state holds a "box-like" range of coordinates around the point user clicked on
  const [range, setRange] = useState({
    leftMin: null,
    leftMax: null,
    topMin: null,
    topMax: null
  })
  // below state holds which character the user identified in the clicked area
  const [userChoice, setUserChoice] = useState(null)
  // below state is used to conditionally render items when user clicks on areas 
  const [userClicked, setUserClicked] = useState(false)
  // below state holds all the correct choices which is used for multiple things
  const [correctChoices, setCorrectChoices] = useState([])
  // below state will conditionally render game-over screen
  const [isGameOver, setIsGameOver] = useState(false)
  // below state holds the input values 
  const [nameInput, setNameInput] = useState("Anonymous");
  // below state holds the current leaderborad from the database
  const [leaderboard, setLeaderboard] = useState({
    title: null,
    scores: null,
  });
  // below state is used to conditionally render leaderboard only when the play game is not active
  const [showLeaderborad, setShowLeaderboard] = useState(true);

  // below effect will load the leaderboard on pageload
  useEffect(() => {
    const currentLeaderboard = getCurrentLeaderBoard();
    currentLeaderboard.then(item => setLeaderboard({
      title: item.title,
      scores: item.scores,
    }));
  }, []);

  // below effect will fetch the mentioned character's coordinates from database and validates user choice
  useEffect(() => {
    if (!userChoice) return; // this line ensures on first load the function doesn't do anything
    const importedData = getTargetCoordinates(userChoice);
    importedData.then(({coordinates}) => {
        // below if statement checks if the character's coordinates lies inside the are selected by user
      if ((coordinates.xAxis > range.leftMin && coordinates.xAxis < range.leftMax) && (coordinates.yAxis > range.topMin && coordinates.yAxis < range.topMax)) {
        setCorrectChoices(correctChoices.concat({
          name: userChoice,
          coordinates: coordinates,
        }))
      }
      setUserClicked(false) // by setting this state to false we can remove the target box and options
    });
  }, [userChoice])
  
  // below effect will set the gameover status to true once all 5 characters are correctly identified
  useEffect(() => {
    if (correctChoices.length >= 5) {
      setIsGameOver(true);
      setShowLeaderboard(true);
      setStartGame(false)
    };
  }, [correctChoices])

  const handleUserChoice = (e) => {
    setUserChoice(e.target.dataset.name);
  }

  const handleCancel = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  const handleNameInput = (e) => {
    setNameInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameInput("Anonymous");
    await submitScoresToLeaderBoard({name: nameInput, time: time.substring(11, 19)}, leaderboard);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
  // this will start the game
  const startTime = () => {
    setStartGame(true);
    setShowLeaderboard(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Where's Waldo?</h1>
        {!startGame && !isGameOver && <button id="start" onClick={startTime}>Start Game!</button>} {/*A conditional reference to make the button disappear*/}
      </header>
      {/* Below condition is necessary because the leaderboard is fetched asycnhronously causing to get reference error without this condition */}
      { showLeaderborad && leaderboard.title && <Leaderboard leaderboard={leaderboard} />}
      <main className={startGame ? 'active' : ''}>
        {/*Below condition basically renders the game screen if gameover state is false and renders gameover screen if it's true */}
        {
        !isGameOver ?
          <div id="gameplay-page">
            {
              startGame && 
                <> 
                  <Timer time={time} setTime={setTime}/>
                  <Waldo 
                  setRange={setRange} 
                  handleUserChoice={handleUserChoice}
                  userClicked={userClicked}
                  setUserClicked={setUserClicked}
                  correctChoices={correctChoices}
                  />
                </>
            }
          </div> :
          <div id="gameover-page">
            <h3>YOU WIN!!!</h3>
            <p>Your Time is: {time.substring(11, 19)}</p>
            <p>Input your name to save your time in the leaderboard!</p>
            <SubmitScore 
            nameInput={nameInput} 
            handleNameInput={handleNameInput} 
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            />
          </div>  
        }
      </main>
      <footer>Project By Ashish-Krishna-K</footer>
    </div>
  );
}

export default App;
