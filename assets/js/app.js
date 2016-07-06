import 'purecss-sass'

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import {Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from 'components/App';

import FrameworkApplication from 'components/FrameworkApplication';
import FrameworkIndex from 'components/FrameworkIndex';
import NotFound from 'components/NotFound';
import frameworks from './frameworks';

const container = document.getElementById('app-container');

const AppRouter = ({frameworks, ...otherProps}) => <Router history={browserHistory}>
  <Route path="/" component={(props) => <App frameworks={frameworks} {...props}/>}>
    <Route path="frameworks">
      <Route path=":framework">
        <IndexRoute component={({params: {framework}}) => <FrameworkIndex name={framework} framework={frameworks[framework]}/>}/>
        <Route path=":application" component={({params: {framework, application}}) => <FrameworkApplication {...{frameworks, framework, application}}/>}/>
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Route>
</Router>;


render(<AppRouter frameworks={frameworks}/>, container);