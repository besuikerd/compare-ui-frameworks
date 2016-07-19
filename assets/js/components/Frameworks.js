import { Component, PropTypes } from 'react';
import {Link, routerShape} from 'react-router'
import R from 'ramda';
import _ from 'lodash';
import classNames from 'classnames';

export default class Frameworks extends Component{
  static propTypes = {
    frameworks: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: routerShape
  };

  render(){
    const { frameworks, children, params: {application} } = this.props;
    const { router } = this.context;
    const menuItems =
      _.map(frameworks,
        (framework, name) => {
          const path = `'/frameworks/'${name}`


          let currentApplicationLink = <div className="pure-menu-link-empty">{" "}</div>;
          const currentApplicationName = _.find(Object.keys(framework.applications), e => e.toLowerCase() === application.toLowerCase());
          if(currentApplicationName !== undefined){
            currentApplicationLink = <Link className="pure-menu-link" to={`/${name}/${currentApplicationName}`}>{currentApplicationName}</Link>
          }

          const className = classNames(
            'pure-menu-item',
            {'pure-menu-selected': router.isActive('/' + name)}
          );
          return <li className={className} key={name}>
            <Link className="pure-menu-link" to={"/" + name}>{name}</Link>
            { currentApplicationLink }
          </li>
        });

    return <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        { menuItems }
      </ul>

      { children }
    </div>
  }
}