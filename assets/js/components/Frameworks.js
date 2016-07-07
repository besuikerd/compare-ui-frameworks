import { Component, PropTypes } from 'react';
import {Link, routerShape} from 'react-router'
import R from 'ramda';
import classNames from 'classnames';

export default class Frameworks extends Component{
  static propTypes = {
    frameworks: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: routerShape
  };

  render(){
    const { frameworks, children } = this.props;
    const { router } = this.context;
    const menuItems =
      R.map(
        (framework) => {
          const path = `'/frameworks/'${framework}`

          const className = classNames(
            'pure-menu-item',
            {'pure-menu-selected': router.isActive('/' + framework)}
          );
          return <li className={className} key={framework}>
            <Link className="pure-menu-link" to={"/" + framework}>{framework}
            </Link></li>
        } , frameworks);

    return <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        { menuItems }
      </ul>

      { children }
    </div>
  }
}