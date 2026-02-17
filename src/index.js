import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import store from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/reduxPersist';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // REQUIRED
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            colors: {
              dark: [
                '#f8f9fa', // text color
                '#e9ecef',
                '#dee2e6',
                '#ced4da',
                '#424242', // table border color
                '#868e96',
                '#121a2d', // dropdown background color
                '#1c2438', // table color & dropdown hover color
                '#212529', // 8
                '#16191d', // 9 (deep background)
              ],
            },
            primaryColor: 'blue',
          }}
        >
        <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
