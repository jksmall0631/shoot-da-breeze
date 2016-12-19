import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import style from '../css/index.scss';
import InputSection from './InputSection';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
      allUsers: null,
      allEmails: null,
    }
  this.updateState = this.updateState.bind(this);
  }

  componentDidMount(){
    firebase.database().ref('messages').on('value', (snapshot) => {
      let data = this.createArray(snapshot.val())
      this.setState({ messages: data })
      this.checkUser();
    });
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
    //push to database
    let tempMessage = {title: message, id: Date.now(), user: this.state.user.displayName, email: this.state.user.email};
    firebase.database().ref('messages').push(tempMessage);

    //push to state
    //not sure we need this anymore since we update page based on what's in database
    // let tempArray = this.state.messages;
    // tempArray.push(tempMessage);
    // this.setState({messages: tempArray});
  }

  checkUser(){
    //loop through messages array and find all users
    // let nameArray = [];
    // let emailArray = [];
    let array = this.state.messages.map((message)=> {
      let user = [message.user, message.email].join(' ')
      return user
      // nameArray.push(message.user);
      // emailArray.push(message.email);
    });
    var uniqueName = array.filter((elem, index, self)=> {
    return index == self.indexOf(elem);
    })
    // var uniqueEmail = emailArray.filter((elem, index, self)=> {
    // return index == self.indexOf(elem);
    // })
    this.setState({allUsers: uniqueName});
    // this.setState({allEmails: uniqueEmail});
  }

  render() {
    if(this.state.user === null){
      return (
      <LoginLogout signInOut={signIn} setUser= {(userName) => this.setState({ user: userName.user })} text="login"/>
      )
    }
    return (
      <section className="Application">
        <LoginLogout signInOut={signOut} setUser= {(userName) => this.setState({ user: null })} text='logout'/>
        <DisplayConversation messages={this.state.messages} />
        <DisplayUsers users={this.state.allUsers} emails={this.state.allEmails} />
        <InputSection updateState={this.updateState}/>
      </section>
    )
  }
}

const DisplayConversation = ({messages})=>{
  if(messages.length > 0) {
    return (
      <ul className="message-container">
        {messages.map((message) => {
          return (<DisplayMessage  key={message.id} timestamp={message.id} title={message.title} user={message.user} />)
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

const DisplayMessage = ({title, timestamp, user}) => {
    let prettyTime = new Date(timestamp).toString().substring(0, 24);
    let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    return (
      <marquee className="message" style={{color:color}}>{prettyTime} [{user}]: {title}</marquee>
  )
}

const LoginLogout = ({signInOut, setUser, text}) => {
  return (
    <div className="login-page">
    <h1 className="shoot-the-breeze">Shoot the Breeze</h1>
    <button className="login-logout" onClick={() => signInOut().then((user)=> setUser(user)) }>{text}</button>
    </div>
  )
}

const DisplayUsers = ({users, emails}) => {
  return(
    <aside>
      <h1>Users</h1>
      {users.map((user)=>{
        console.log(user);
        return (<p key= {Math.random()}>{user}</p>);
      })}
    </aside>
  )
}
