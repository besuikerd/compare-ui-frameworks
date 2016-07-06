import Vue from 'vue';
import view from './view.html';

const subcomponent = {
  props: ['name'],
  template: '<div>epic subcomponent: {{name}}</div>'
}

export default {
  template: view,
  data: (obj) => {
    return {
      message: 'Todo!!!'
    }
  },
  components: {
    subcomponent
  }
}