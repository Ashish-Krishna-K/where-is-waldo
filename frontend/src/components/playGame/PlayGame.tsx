import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { TPlayGameLoaderData } from '../../types';
import GameComponent from '../gameComponent/GameComponent';
import styles from './PlayGame.module.css';

const PlayGame = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { gameImg } = useLoaderData() as TPlayGameLoaderData;
  if (!startGame)
    return (
      <div className={styles.startGame}>
        <p>The timer starts running as soon as start game button is clicked</p>
        <button
          onClick={() => {
            setStartGame(true);
          }}
        >
          Start game?
        </button>
      </div>
    );
  else return <GameComponent gameImg={gameImg} />;
};

export default PlayGame;
