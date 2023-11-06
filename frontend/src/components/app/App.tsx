import { Link, Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import styles from './App.module.css';

const App = () => {
  const { state } = useNavigation();
  if (state === 'loading') return <Spinner />;
  return (
    <>
      <header className={styles.header}>
        <Link to={'/'}>
          <h1>Where is...</h1>
        </Link>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to={'/play'}>Play Game</Link>
            </li>
            <li>
              <Link to={'/leaderboards'}>Leaderboards</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>
          Project by <a href="https://github.com/Ashish-Krishna-K">Ashish-Krishna-K</a>
        </p>
      </footer>
    </>
  );
};

export default App;
