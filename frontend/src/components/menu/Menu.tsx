import { Link, useNavigation } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import type { TGameMenuLoaderData } from '../../types';
import Spinner from '../spinner/Spinner';
import styles from './Menu.module.css';

const Menu = () => {
  const { allImgsId } = useLoaderData() as TGameMenuLoaderData;
  const { state } = useNavigation();
  if (state === 'loading') return <Spinner />;
  else if (typeof allImgsId === 'undefined') return <p>Something went wrong!</p>;
  else
    return (
      <ul className={styles.menu}>
        {allImgsId.map((item) => (
          <li key={item.id}>
            <Link to={`${item.id}`}>
              <img
                className={styles.menuImg}
                src={`${import.meta.env.VITE_BASE_URI}/${item.id}.png`}
                alt={item.gameName}
              />
              <h2>Play {item.gameName}</h2>
            </Link>
          </li>
        ))}
      </ul>
    );
};

export default Menu;
