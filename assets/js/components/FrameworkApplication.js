import {Component, PropTypes} from 'react';

import UnknownFramework from 'components/UnknownFramework';

export default class FrameworkApplication extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    frameworks: PropTypes.object.isRequired,
    framework: PropTypes.string.isRequired,
    application: PropTypes.string.isRequired
  };

  componentDidMount(){
    this.mountFrameworkApplication();
  }

  componentWillReceiveProps(props){
    this.unmountFrameworkApplication();
    this.mountFrameworkApplication();
  }

  componentWillUnmount(){
    this.unmountFrameworkApplication();
  }

  unmountFrameworkApplication(){

    const { unmount } = this.state;
    if(unmount !== undefined){
      unmount();
    }
  }

  mountFrameworkApplication(){
    const {
      frameworks,
      framework,
      application
    } = this.props;
    const container = this.refs.container;

    let theApplication = UnknownFramework(framework, application);
    const theFramework = frameworks[framework]
    if(theFramework !== undefined){
      const applications = theFramework.applications;
      if(applications[application] !== undefined){
        theApplication = applications[application];
        const unmount = theFramework.mount(container, theApplication);
        this.setState({unmount});
        return;
      }
    }

  }

  componentWillUnmount(){
    this.unmountFrameworkApplication();
  }

  render(){
    return <div ref="container">
    </div>
  }
}

export function framework(mount){
  return () => <FrameworkApplication mount={mount}/>
}
