import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../app/App';
import HomePage from '../homePage/HomePage';
import Menu from '../menu/Menu';
import menuLoader from '../menu/menuLoader';
import PlayGame from '../playGame/PlayGame';
import playGameLoader from '../playGame/playGameLoader';
import submitScoreAction from '../submitScore/submitScoreAction';
import Leaderboard from '../leaderboard/Leaderboard';
import leaderboardLoader from '../leaderboard/leaderboardLoader';
import ErrorPage from '../errorPage/ErrorPage';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/play',
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Menu />,
              errorElement: <ErrorPage />,
              loader: menuLoader,
            },
            {
              path: ':gameId',
              element: <PlayGame />,
              errorElement: <ErrorPage />,
              loader: playGameLoader,
              action: submitScoreAction,
            },
          ],
        },
        {
          path: '/leaderboards',
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Menu />,
              errorElement: <ErrorPage />,
              loader: menuLoader,
            },
            {
              path: ':gameId',
              element: <Leaderboard />,
              errorElement: <ErrorPage />,
              loader: leaderboardLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
