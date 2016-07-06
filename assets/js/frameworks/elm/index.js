// import todo from './Todo';
import readme from './README.md';


const regex = /^\.\/(.*)\/Main.elm/;

import extractModules from 'lib/extract-modules';

const apps = require.context('./applications', true, /^\.\/.*\/Main.elm/);
const applications = extractModules(apps.keys(), apps.keys().map(apps), /^\.\/(.*)\/Main.elm/, false);
console.log(applications);

export default {
  description: readme,
  applications,
  mount: (container, app) => {
    console.log(app);
    app.Main.embed(container);
    return () => location.reload();
  }
}
