import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketProvider } from './contextApi/SocketContext';
import { NotificationProvider } from './contextApi/NotificationContext';
import './index.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SocketProvider>
  </React.StrictMode>
);
