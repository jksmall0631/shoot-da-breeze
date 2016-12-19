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
    this.setState({currentMessage: userInput})
    this.characterCount();
  }

  characterCount() {
    if(this.state.currentMessage.length > 140) {
      console.log(this.state.currentMessage.length)
      this.disableButton();
    } else {
      this.state.disabled = false;
    }
  }

  toggleDisable() {
    if(this.state.currentMessage.length){
      this.state.disabled = false;
    }
    this.state.disabled = true;
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
          disabled={this.state.disabled}
          type='button'
          className='submit-button'
          onClick={this.submit}
          >Send</button>
      </article>
    )
  }
}
