import React, {Component} from 'react'

export default class InputSection extends Component {
  constructor() {
    super();
    this.state = {
      currentMessage: '',
      disabled: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e){
    const userInput = e.target.value;
    this.setState({currentMessage: userInput});
    if(this.state.currentMessage > 140){

    }
  }

  clearInputField() {
    this.setState({ currentMessage: ''});
  }

  submit(e){
    this.props.updateState(this.state.currentMessage)
    this.clearInputField()
  }

  render() {
    return (
      <article className="container">
        <input
          type='text'
          className='user-input'
          placeholder='Message'
          onChange={this.handleChange}
          value={this.state.currentMessage}
        ></input>
        <p>
          {this.state.currentMessage.length}
        </p>
        <button
          disabled={!this.state.currentMessage || this.state.currentMessage.length > 140}
          type='button'
          className='submit-button'
          onClick={this.submit}
          >Send</button>
      </article>
    )
  }
}
