import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
    }
  this.updateState = this.updateState.bind(this);
  }

  componentDidMount(){
    firebase.database().ref('messages').on('value', (snapshot) => {
      let data = this.createArray(snapshot.val())
      this.setState({ messages: data })
    })
  }

  createArray(value) {
    console.log(value);
    let keys = Object.keys(value)
    let messages = keys.map((singleMessage) => {
      return value[singleMessage]
    })
    return messages
  }

  // object['firebaseId'] = singleMessage

  updateState(message){
    this.state.messages.push(message)
    this.setState({messages: this.state.messages});
  }

  render() {
    return (
      <section className="Application">
        <DisplayConversation messages={this.state.messages} />
        <InputSection updateState={this.updateState}/>
      </section>
    )
  }
}

class InputSection extends Component {
  constructor() {
    super();
    this.state = {
      currentMessage: '',
      disabled: false,
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

  disableButton() {
    this.state.disabled = true;
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
        <p>
          {this.state.currentMessage.length}
        </p>
        <button
          disabled={this.state.disabled}
          type= 'button'
          className= 'submitButton'
          onClick= {this.submit}
          ></button>
      </article>
    )
  }
}

const DisplayConversation = ({messages})=>{
  if(messages.length > 0) {
    return (
      <ul>
        {messages.map((message) => {
          return (<DisplayMessage  key={message.createdAt} {...message} />)
        })
        }
      </ul>
    )
  }
  return(
    <div>
    <h1> content </h1>
    </div>
  )
}

const DisplayMessage = ({content, createdAt})=>{
    return (
      <li>{content}</li>
  )
}
