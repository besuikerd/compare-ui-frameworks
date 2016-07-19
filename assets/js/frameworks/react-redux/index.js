import readme from './README.md';
import { render, unmountComponentAtNode } from 'react-dom';
import extractModules from 'lib/extract-modules';

const apps = require.context('./applications', true, /^\.\/[^/]*\/index.js/);
const applications = extractModules(apps.keys(), apps.keys().map(apps));


export default {
  description: readme,
  applications,
  mount: (container, App) => {
    render(<App/>, container);
    return () => unmountComponentAtNode(container);
  }
}
