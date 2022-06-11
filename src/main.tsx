import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { inspect } from '@xstate/inspect';
import App from './app';
import './index.css';

inspect();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
