import React, {Component} from 'react'

export default class InputSection extends Component {
  constructor() {
    super();
    this.state = {
      currentMessage: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e){
    const userInput = e.target.value;
    this.setState({currentMessage: userInput})
  }

  submit(e){
    this.props.updateState(this.state.currentMessage)
  }

  render() {
    return (
      <article>
        <input
          type= 'text'
          className= 'userInput'
          placeholder= 'Message'
          onChange= {this.handleChange}
          value= {this.state.currentMessage}
        ></input>
        <button
          type= 'button'
          className= 'submitButton'
          onClick= {this.submit}
          ></button>
      </article>
    )
  }
}
