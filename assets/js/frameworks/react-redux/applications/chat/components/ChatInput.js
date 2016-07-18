import { Component } from 'react';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';

export default class ChatInput extends Component{

  @autobind
  onChange(e){
    this.props.setTextInput(e.target.value);
  }

  @autobind
  onSubmit(e){
    e.preventDefault();
    this.props.sendMessage();
  }

  render(){
    const {
      textInput,
      sendMessage,
    } = this.props;

    return <div className="chat-input">
      <form className="pure-form" onSubmit={this.onSubmit}>
        <fieldset>
          <div className="chat-input-fields">
            <input className="chat-input-field" type="text" placeholder="Send message" value={textInput} onChange={this.onChange} autoFocus/>
            <button className="pure-button pure-button-primary">Send</button>
          </div>

        </fieldset>
      </form>
    </div>
  }
}