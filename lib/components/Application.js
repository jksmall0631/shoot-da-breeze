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
    const dataReference = firebase.database().ref().child('shoot-the-breeze-a9145');
    const messageReference = dataReference.child('messages');
    messageReference.on('value', snap=>{
      this.setState({
        messages: snap.val()
      })
    })
  }

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

const DisplayConversation = ({messages})=>{
  console.log(messages);
  return (
    <ul>
      {messages.map((message) => {
        return <DisplayMessage message={message} />
      })
      }
    </ul>
  )
}

const DisplayMessage = ({message})=>{
  return (
      <li>{message}</li>
  )
}
