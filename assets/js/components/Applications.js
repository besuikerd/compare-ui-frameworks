import { Component, PropTypes } from 'react';
import {Link, routerShape} from 'react-router'
import R from 'ramda';
import classnames from 'classnames';

export default class Applications extends Component{
  static propTypes = {
    framework: PropTypes.string.isRequired,
    applications: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: routerShape
  };


  render(){
    const {
      framework,
      applications
    } = this.props;
    const { router } = this.context;

    const menuItems =
      R.map((application) => {
        const path = `/frameworks/${framework}/${application}`;
        const className = classnames(
          'pure-menu-item',
          {'pure-menu-selected': router.isActive(path)}
        );
        return <li className={className} key={application}>
            <Link className="pure-menu-link" to={path}>
              { application }
            </Link>
          </li>
      }, applications);

    return <ul className="pure-menu pure-menu-horizontal">
      {menuItems}
    </ul>
  }
}