import React from 'react';

const UserButtons = ({user, sortUsers, className}) => {
  return <button className={className + 'button'} onClick={()=> {
    sortUsers(user);
  }}>{user}</button>;
}

export default UserButtons;
