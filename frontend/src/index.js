/**
 * File: frontend/src/index.js
 * Điểm khởi chạy của ứng dụng Frontend ReactJS
 * Dự án: Mekong Mobile CRM - Luồng 05: Kho linh kiện thay thế
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
