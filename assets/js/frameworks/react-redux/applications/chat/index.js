import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import url from 'url';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import messageSocket from './middleware/message-socket';

import login from './actions/login';

import App from './containers/AppContainer';
import reducer from './reducers';



const store = createStore(
  reducer,
  applyMiddleware(
    messageSocket(),
    thunk,
    logger()
  )
);

const params = url.parse(window.location.href, true).query;
if(params.username){
  store.dispatch(login.setUsername(params.username));
}
if(params.password){
  store.dispatch(login.setPassword(params.password));
}
if(params.username && params.password){
  store.dispatch(login.login());
}


export default () => <Provider store={store}>
  <App/>
</Provider>
