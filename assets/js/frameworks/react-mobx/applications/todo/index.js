import Store from './model/Store';

const store = new Store();
store.connect();


import App from './components/App';

export default () => <App {...{store}}/>;
