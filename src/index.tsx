import React from 'react';

import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';

import { store } from './app/app.store';

import reportWebVitals from './reportWebVitals';

import { fetchMusicFestivals } from './state/slices/festivals.slice';

import './index.css';

store.dispatch(fetchMusicFestivals());

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
