import { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

export default class FrameworkIndex extends Component{
  static propTypes = {
    framework: PropTypes.object,
    name: PropTypes.string.isRequired
  };

  render(){
    const {
      framework,
      name
    } = this.props;

    const index = framework !== undefined ? <ReactMarkdown source={framework.description}/> : <p>Unknown framework</p>

    return <div>
      <h1>{name}</h1>
      {index}
    </div>
  }
}