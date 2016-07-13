import React, {Component, PropTypes} from 'react';

import Applications from 'components/Applications';
import Frameworks from 'components/Frameworks';

export default class App extends Component {
  static propTypes = {
    frameworks: PropTypes.object
  };


  render(){
    const { frameworks, children, params } = this.props;
    let applicationView = null;
    if(params.framework){
      let applications = frameworks[params.framework];
      if(applications !== undefined){
        applications = applications.applications;
        const applicationNames = Object.keys(applications);
        applicationView = <Applications framework={params.framework} applications={applicationNames}/>
      }
    }

    return <div className="app-instance">
      <Frameworks frameworks={Object.keys(frameworks)}/>
      {
        applicationView
      }
      { children }
    </div>;

  }
}
