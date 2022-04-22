import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import './services/firebase';
import './styles/global.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<React.StrictMode>
  <App/>
</React.StrictMode>);


