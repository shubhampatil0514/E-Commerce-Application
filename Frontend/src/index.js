import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store/Store'
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

