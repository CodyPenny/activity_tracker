import React, { useContext  }  from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import FriendPageListHelper from './FriendPageListHelper.jsx';

const FriendPageList = () => {
    const { friends } = useContext(UserContext);

  return (
      <div>
          { friends.length > 0 && friends.map((friend, i) => (
             friend && <FriendPageListHelper friend={friend} key={i}/>
          ))
          }

      </div>
  )
}

export default FriendPageList