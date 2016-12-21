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
      userMessages: null,
      reverse: false,
      userInput: null,
      filterMessages: [],
    }
  this.updateState = this.updateState.bind(this);
  this.sortUsers = this.sortUsers.bind(this);
  this.allMessages = this.allMessages.bind(this);
  }

  componentWillMount(){
    this.setState({userMessages: null});
  }

  componentDidMount(){
    firebase.database().ref('messages').on('value', (snapshot) => {
      if(snapshot.val()){
      let data = this.createArray(snapshot.val())
      this.setState({ messages: data })
      this.checkUser();
      }
    });
  }

  searchBar(e) {
    const userInput = e.target.value
    const filterConvo = this.state.messages.filter((message) => {
      return message.title.toLowerCase().includes(userInput.toLowerCase());
    });
    this.setState({ filterMessages: filterConvo });
  }

  createArray(value) {
    let keys = Object.keys(value)
    let messages = keys.map((singleMessage) => {
      return value[singleMessage]
    })
    return messages
  }

  updateState(message){
    let tempMessage = {title: message, id: Date.now(), user: this.state.user.displayName, email: '(' + this.state.user.email + ')'};
    firebase.database().ref('messages').push(tempMessage);
  }

  checkUser(){
    let array = this.state.messages.map((message)=> {
      let user = [message.user, message.email].join(' ')
      return user
    });
    var uniqueName = array.filter((elem, index, self)=> {
    return index == self.indexOf(elem);
    })
    this.setState({allUsers: uniqueName});
  }

  sortUsers(user){
    let selectedUser = this.state.messages.filter((message)=> {
      if(message.user + ' ' + message.email == user){
        return message;
      }
    });
    this.setState({userMessages: selectedUser});
  }

  chooseMessages() {
    if(this.state.filterMessages.length > 0){
      return this.state.filterMessages
    } else {
      return this.state.messages
    }
  }

  allMessages() {
    this.setState({userMessages: null});
  }

  render() {
    let button;
    let inputSection;
    let userNameSection;
    if(this.state.user === null){
      button = (<LoginLogout className="login" signInOut={signIn} setUser= {(userName) => this.setState({ user: userName.user })} text="login"/>);
      inputSection = (<p className="pls-login">Please log in to enter message</p>);
    }
    else{
      button = (<LoginLogout className="logout" signInOut={signOut} setUser= {(userName) => this.setState({ user: null })} text='logout'/>);
      inputSection = (<InputSection updateState={this.updateState}/>);
      userNameSection = (<p className="current-user">You are signed in as {this.state.user.displayName}</p>);


    }
    return (
      <section className="application">
        <div className="header">
          <h1 className="shoot-the-breeze">Shoot the Breeze</h1>
          <input className="search-input"  onChange={(e) => this.searchBar(e)} placeholder="Filter Messages"></input>
          <div className="rapper">
          {button}
          <button className="reverse-btn" onClick={()=>{this.setState({reverse: true})}}>sort ↑↓</button>
          </div>
        </div>
        {/* <button onClick={()=>{this.setState({reverse: false})}}>chron</button> */}
        <DisplayConversation messages={this.chooseMessages()} userMessages={this.state.userMessages} reverse={this.state.reverse} />
        <DisplayUsers users={this.state.allUsers} emails={this.state.allEmails} sortUsers={this.sortUsers} allMessages={this.allMessages} />
        {userNameSection}
        {inputSection}
      </section>
    )
  }
}

const DisplayConversation = ({messages, userMessages, reverse})=>{
  if(userMessages) {
    if(reverse){
      return (
        <ul className="message-container">
          {userMessages.reverse().map((message) => {
            return (<DisplayMessage  key={message.id} timestamp={message.id} title={message.title} user={message.user} />)
          })
          }
        </ul>
      )
    }
    return (
      <ul className="message-container">
        {userMessages.map((message) => {
          return (<DisplayMessage  key={message.id} timestamp={message.id} title={message.title} user={message.user} />)
        })
        }
      </ul>
    )
  }
  else if(messages.length > 0) {
    if(reverse){
      return (
        <ul className="message-container">
          {messages.reverse().map((message) => {
            return (<DisplayMessage  key={message.id} timestamp={message.id} title={message.title} user={message.user} />)
          })
          }
        </ul>
      )
    }
    return (
      <ul className="message-container">
        {messages.map((message) => {
          return (<DisplayMessage  key={message.id} timestamp={message.id} title={message.title} user={message.user} message={message}/>)
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
   return (
     <p className="message">
     <span className="pretty-time">{prettyTime} </span>
      <span className="name-of-user">{user} </span><br/>
      <span className="single-message">{title}</span>
      </p>
 )
}

const LoginLogout = ({signInOut, setUser, text, className}) => {
  return (
    <button className={className + 'button'} onClick={() => signInOut().then((user)=> setUser(user)) }>{text}</button>
  )
}

const DisplayUsers = ({users, emails, sortUsers, className, allMessages}) => {
  if(users){

  return(
    <aside>
      <h1>Users</h1>
      <button className='userbutton' onClick={allMessages}>All Users</button>
      {users.map((user)=>{
        return <UserButtons key= {Math.random()} className='user' user={user} sortUsers={sortUsers}/>;
      })}
    </aside>
  )
  }
  else{
    return <h1>none</h1>
  }
}

const UserButtons = ({user, sortUsers, className}) => {
  return <button className={className + 'button'} onClick={()=> {
    sortUsers(user);
  }}>{user}</button>;
}
