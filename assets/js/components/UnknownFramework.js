import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default (framework, application) => (container) => {
  render(<App {...{framework, application}}/>, container);
  return () => unmountComponentAtNode(container)
}