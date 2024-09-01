import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Initial state
const DEFAULT_STATE = {
  auth: { isAuthenticated: false },
  error: { message: null },
  polls: [],
  currentPoll: {
    _id: '5b086e20f7d2381502ce0e46',
    options: [],
    question: 'test_poll',
  },
};

// Middleware setup
const middleware = [thunk];

// Redux DevTools setup
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create store
export const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  compose(applyMiddleware(...middleware), devTools),
);
