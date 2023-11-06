import { LoaderFunction } from 'react-router-dom';

const loader: LoaderFunction = async () => fetch(`${import.meta.env.VITE_BASE_URI}/api`);

export default loader;
