import readme from './README.md';
import DevTools from 'mobx-react-devtools';
import { render, unmountComponentAtNode } from 'react-dom';
import extractModules from 'lib/extract-modules';

const apps = require.context('./applications', true, /^\.\/.*\/index.js/);
const applications = extractModules(apps.keys(), apps.keys().map(apps));

export default {
  description: readme,
  applications,
  mount: (container, App) => {
    console.log(App);

    const wrappedApplication = <div>
      <DevTools/>
      <App/>
    </div>
    render(wrappedApplication, container);
    return () => unmountComponentAtNode(container);
  }
}