import {createLogger} from 'redux-logger';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({collapsed: true});

export const configureStore = (initialState, reducer) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
};
