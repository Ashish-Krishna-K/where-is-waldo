import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './components/router/Router.tsx';

const altRoot = document.createElement('div');
altRoot.id = 'root';

ReactDOM.createRoot(document.getElementById('root') ?? altRoot).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
