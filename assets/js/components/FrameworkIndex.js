import { Component, PropTypes } from 'react';
import { MarkdownPreview } from 'react-marked-markdown';

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

    const index = framework !== undefined ? <MarkdownPreview value={framework.description}/> : <p>Unknown framework</p>

    return <div>
      <h1>{name}</h1>
      {index}
    </div>
  }
}