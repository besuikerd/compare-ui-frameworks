import { Component } from 'react';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';

@observer
export default class TodoInput extends Component{

  @autobind
  updateTextfield(e){
    this.props.store.setTextInput(e.target.value);
  }

  @autobind
  addTodo(e){
    e.preventDefault();
    this.props.store.addTodo();
  }

  componentDidMount(){
    setTimeout(() => this.refs.input.focus(), 0); // http://stackoverflow.com/questions/35522220/react-ref-with-focus-doesnt-work-without-settimeout-my-example
  }

  render(){
    const {
      store: {
        textInput
      }
    } = this.props;

    return <form className="pure-form" onSubmit={this.addTodo}>
      <div className="todo-input">
        <input ref="input" className="todo-input-field" type="text" value={textInput} onChange={this.updateTextfield}/>
        <button className="todo-input-button pure-button pure-button-primary">Add</button>
      </div>
    </form>
  }
}