import { type MouseEventHandler, useEffect, useState } from 'react';
import type { TGameComponentProps, TCoordinates, TGameImgAnswerData } from '../../types';
import { getDistance, getElapsedTimeForDisplay } from '../../helpers';
import Modal from '../modal/Modal';
import SubmitScore from '../submitScore/SubmitScore';
import styles from './GameComponent.module.css';

const GameComponent = ({ gameImg }: TGameComponentProps) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<TCoordinates | null>(null);
  const [correctSelections, setCorrectSelections] = useState<TCoordinates[]>([]);
  const [pendingChoices, setPendingChoices] = useState<TGameImgAnswerData[]>(gameImg.answers);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const { id, gameName, answers } = gameImg;
  // Function to show options and selection when user clicks on a point in image
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setCoordinates({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };
  // Function to handle user selection from the options
  const handleOptionSelection: MouseEventHandler = (event) => {
    const targetValue = (event.target as HTMLButtonElement).value;
    const userSelection = answers.find((answer) => answer.id === targetValue);
    if (typeof userSelection !== 'undefined' && coordinates !== null) {
      const correctCoordinates = {
        x: userSelection.xAxis,
        y: userSelection.yAxis,
      };
      const distance = getDistance(correctCoordinates, coordinates);
      // A margin or error of 10 points is provided because it's impossible to be exact.
      if (distance < 10) {
        setCorrectSelections([...correctSelections, coordinates]);
        const newChoices = pendingChoices.filter((item) => item.id !== targetValue);
        setPendingChoices(newChoices);
        if (newChoices.length < 1) setIsGameOver(true);
      }
    }
    setCoordinates(null);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isGameOver) {
      interval = setInterval(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timeElapsed, isGameOver]);
  if (isGameOver)
    return (
      <Modal shouldOpen={true}>
        <SubmitScore completionTime={timeElapsed} />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <div className={styles.gameHeader}>
        <h2>{gameName}</h2>
        <p>
          <strong>{getElapsedTimeForDisplay(timeElapsed)}</strong>
        </p>
      </div>
      <div className={styles.answers}>
        <ul>
          {pendingChoices.map((item) => (
            <li key={item.id}>
              <img src={`${import.meta.env.VITE_BASE_URI}/${item.name}.png`} alt={item.name} />
              <h3>{item.name}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.playArea}>
        <div className={styles.imgContainer}>
          <img src={`${import.meta.env.VITE_BASE_URI}/${id}.png`} alt={gameName} onClick={handleClick} />
          {coordinates !== null && <Selection color={'black'} x={coordinates.x} y={coordinates.y} />}
          {coordinates !== null && (
            <div
              className={styles.choices}
              style={{
                left: `${coordinates.x + 20}px`,
                top: `${coordinates.y}px`,
              }}
            >
              <ul>
                {pendingChoices.map((item) => (
                  <li key={item.id}>
                    <button value={item.id} onClick={handleOptionSelection}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {correctSelections.length > 0 &&
            correctSelections.map((item, ind) => <Selection color="green" x={item.x} y={item.y} key={ind} />)}
        </div>
      </div>
    </div>
  );
};

// show a circle at the point of click as "selection"
const Selection = ({ color, x, y }: { color: string; x: number; y: number }) => {
  return (
    <div
      style={{
        left: `${x - 20}px`,
        top: `${y - 20}px`,
        backgroundColor: color,
      }}
      className={styles.selection}
    ></div>
  );
};

export default GameComponent;
