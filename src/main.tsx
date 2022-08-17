import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import { Provider } from 'react-redux';

import '@nabcellent/sui-react/dist/css/theme.css';
import '@nabcellent/sui-react/dist/css/user.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}><App/></Provider>
      </BrowserRouter>
  </React.StrictMode>
)
