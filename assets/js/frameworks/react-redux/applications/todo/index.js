import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import url from 'url';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import todo from './actions/todo';
import reducer from './reducers';


import App from './components/App';

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger()
  )
);

store.dispatch(todo.connect());

export default () => <Provider store={store}>
  <App/>
</Provider>;
