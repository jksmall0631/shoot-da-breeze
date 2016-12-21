import React from 'react';
// import Application from '../Application';

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
    <h1></h1>
    </div>
  )
}

module.exports = DisplayConversation;
