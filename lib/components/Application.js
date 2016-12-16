import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';

import InputSection from './InputSection';

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
    let keys = Object.keys(value)
    let messages = keys.map((singleMessage) => {
      return value[singleMessage]
    })
    return messages
  }

  // object['firebaseId'] = singleMessage

  updateState(message){
    // debugger;
    firebase.database().ref('messages').push({title: message, id: Date.now()});

    let tempArray = this.state.messages;
    tempArray.push({title: message, id: Date.now()});
    this.setState({messages: tempArray});
  }

  render() {
    return (
      <section className="Application">
        <LoginLogout signIn={signIn} setUser= {(userName) => this.setState({ user: userName.user })}/>
        <DisplayConversation messages={this.state.messages} />
        <InputSection updateState={this.updateState}/>
      </section>
    )
  }
}

const DisplayConversation = ({messages})=>{
  if(messages.length > 0) {
    return (
      <ul>
        {messages.map((message) => {
          return (<DisplayMessage  key={message.id} title={message.title} />)
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

const DisplayMessage = ({title}) => {
    return (
      <li>{title}</li>
  )
}

const LoginLogout = ({signIn, setUser}) => {
  return (
    <button onClick={() => signIn().then((user)=> setUser(user)) }>Login</button>
  )
}
