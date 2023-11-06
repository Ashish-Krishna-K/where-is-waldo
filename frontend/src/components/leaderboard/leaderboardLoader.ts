import { LoaderFunction } from 'react-router-dom';

const loader: LoaderFunction = async ({ params }) =>
  fetch(`${import.meta.env.VITE_BASE_URI}/api/${params.gameId}/leaderboard`);

export default loader;
