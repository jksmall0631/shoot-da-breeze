import React from 'react';

const LoginLogout = ({signInOut, setUser, text, className}) => {
  return (
    <button className={className + 'button'} onClick={() => signInOut().then((user)=> setUser(user)) }>{text}</button>
  )
}

export default LoginLogout;
