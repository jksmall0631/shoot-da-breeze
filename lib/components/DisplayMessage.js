import React from 'react';

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

export default DisplayMessage;
