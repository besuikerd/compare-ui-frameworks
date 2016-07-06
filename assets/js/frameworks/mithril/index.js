import readme from './README.md';
import m from 'mithril';

const model = {
  message(){
    return 'Todo';
  }
};


const App = {
  controller(){
    const msg = model.message();
    return {
      msg
    };
  },

  view(ctrl){
    return m('div', [
      m('span', ctrl.msg)
    ]);
  }
};


export default {
  description: readme,
  applications: {
    todo: App
  },
  mount: (container) => {
    m.mount(container, App);
    return () => {
      m.mount(container, null);
    }
  }
};