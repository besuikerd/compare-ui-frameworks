// import todo from './Todo';
import readme from './README.md';


const regex = /^\.\/(.*)\/Main.elm/;

import extractModules from 'lib/extract-modules';

const apps = require.context('./applications', true, /^\.\/.*\/Main.elm/);
const applications = extractModules(apps.keys(), apps.keys().map(apps), /^\.\/(.*)\/Main.elm/, false);

export default {
  description: readme,
  applications,
  mount: (container, app) => {
    const name = Object.keys(app)[0];
    app[name].Main.embed(container);
    return () => location.reload();
  }
}
