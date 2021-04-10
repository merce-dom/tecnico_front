import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './components/home';
import Estructura from './components/estructura/estructura';
import Repuestos from './components/repuestos/repuestos';
import Login from './components/login';
import { CookiesProvider, useCookies } from 'react-cookie';

const Render = () => {
  const [token] = useCookies(['tec-token']);
 
  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path='/' >
          {token['tec-token'] ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path='/home'> 
          {token['tec-token'] ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route exact path='/estructura'>
          {token['tec-token'] ? <Estructura /> : <Redirect to="/" />}
        </Route>
        <Route exact path='/repuestos'>
          {token['tec-token'] ? <Repuestos /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Render />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();