import React, { Component } from 'react';

const filterMessages = (user, messages) => {
  let selectedUser = messages.filter((message)=> {
    if(message.user + ' ' + message.email == user){
      return message;
    }
  });
  return selectedUser
}

export default filterMessages;
