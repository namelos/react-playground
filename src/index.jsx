import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, bindActionCreators, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

const inc = () => ({ type: 'INC' });
const dec = () => ({ type: 'DEC' });
const incIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();
  if (counter % 2 === 0) {
    return;
  }
  dispatch(inc());
}
const incAsync = (delay = 1000) => dispatch => setTimeout(() => dispatch(inc()), delay);

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
};

const reducer = combineReducers({
  counter
});

const store = applyMiddleware(thunk)(createStore)(reducer);

const Counter = ({ counter, inc, dec, incIfOdd, incAsync }) => <p>
  Clicked: { counter } times
  {' '}
  <button onClick={ inc }>+</button>
  {' '}
  <button onClick={ dec }>-</button>
  {' '}
  <button onClick={ incIfOdd }>IncIfOdd</button>
  {' '}
  <button onClick={ () => incAsync() }>Async</button>
</p>

const stateToProps = state => ({ counter: state.counter });
const dispatcherToProps = dispatch => bindActionCreators({ inc, dec, incIfOdd, incAsync }, dispatch);

const App = connect(stateToProps, dispatcherToProps)(Counter);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
