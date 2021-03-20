import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import appReducers from './store/reducers/appReducers';
import createClassReducer from './store/reducers/createClassReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';


axios.defaults.baseURL = "https://classroom-lite-a1458-default-rtdb.firebaseio.com/";

const multReducers = combineReducers({
    app: appReducers,
    createClass: createClassReducer
})

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : (reducers) => reducers;


const store = createStore(multReducers, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
