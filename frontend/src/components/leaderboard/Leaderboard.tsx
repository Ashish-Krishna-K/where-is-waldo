import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import type { TLeaderboardLoaderData } from '../../types';
import { getElapsedTimeForDisplay } from '../../helpers';
import Spinner from '../spinner/Spinner';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { gameName, leaderboard } = useLoaderData() as TLeaderboardLoaderData;
  const { gameId } = useParams();
  const { state } = useNavigation();
  if (state === 'loading') return <Spinner />;
  else if (typeof leaderboard === 'undefined') return <p>Something went wrong!</p>;
  else
    return (
      <div className={styles.leaderboard}>
        <h2>{gameName} Leaderboard</h2>
        <img src={`${import.meta.env.VITE_BASE_URI}/${gameId}.png`} alt={gameName} />
        <div className={styles.tableContainer}>
          {leaderboard.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th>Player Name</th>
                  <th>Completion Time</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.displayName}</td>
                    <td>{getElapsedTimeForDisplay(item.completionTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Entries yet...</p>
          )}
        </div>
      </div>
    );
};

export default Leaderboard;
