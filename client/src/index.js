import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './components/main'
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
      <Main/>
    </BrowserRouter>,
  document.getElementById('root')
);