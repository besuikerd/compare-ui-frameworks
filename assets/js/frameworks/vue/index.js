import Vue from 'vue';
import readme from './README.md';

const id = 'vue-container';
const componentName = 'application';

import extractModules from 'lib/extract-modules';

const apps = require.context('./applications', true, /^\.\/.*\/index.js/);
const applications = extractModules(apps.keys(), apps.keys().map(apps));

export default {
  description: readme,
  applications,
  mount: (container, app) => {
    const vueContainer = document.createElement('div');
    vueContainer.setAttribute('id', id);
    const component = document.createElement(componentName);
    component.setAttribute('epic', 'true');
    vueContainer.appendChild(component);
    container.appendChild(vueContainer);

    const components = {};
    components[componentName] = app;

    new Vue({
      el: `#${id}`,
      components
    });
    return () => {
      container.innerHTML = '';
    }
  }
}