import React, { useContext  }  from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import FriendPageListHelper from './FriendPageListHelper.jsx';

const FriendPageList = () => {
    const user = useContext(UserContext);
    console.log('friends in friendpagelist ', user.friends, user.friends.length)
    // console.log('friends in friendpagelist ', friends, friends.length)
  return (
      <div>
          { user.friends.length > 0 && user.friends.map((friend, i) => (
             friend && <FriendPageListHelper friend={friend} key={i}/>
          ))
          }

      </div>
  )
}

export default FriendPageList