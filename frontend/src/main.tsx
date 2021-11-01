import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainNav } from './components/common/mainNav';
import { Main } from './pages/main';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainNav />
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
