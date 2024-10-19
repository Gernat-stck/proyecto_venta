import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import "react-toastify/dist/ReactToastify.css";
import RoutesComp from './routes/Routes';
import ErrorBoundary from './utils/ErrorBoundary';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <RoutesComp />
  </ErrorBoundary>
);

