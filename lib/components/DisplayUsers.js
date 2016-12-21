import React from 'react';
import UserButtons from './UserButtons';

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
    return <h1></h1>
  }
}

export default DisplayUsers;
