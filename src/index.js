import React from 'react';
import ReactDOM from 'react-dom';
// pages:
import MarkerInfoWindowGmapsObj from './components/MarkerInfoWindowGmapsObj';
// styles
import './index.css';
// components
// utils
import registerServiceWorker from './registerServiceWorker';

import App from './App';


ReactDOM.render(
  <App>
    <MarkerInfoWindowGmapsObj />
  </App>
  , document.getElementById('root'),
);

registerServiceWorker();
