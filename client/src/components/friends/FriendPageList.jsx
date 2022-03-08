import React, { useContext  }  from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import FriendPageListHelper from './FriendPageListHelper.jsx';

const FriendPageList = () => {
    const { friends } = useContext(UserContext);

  return (
      <div>
          { friends.map((friend, i) => (
              <FriendPageListHelper friend={friend} key={i}/>
          ))
          }

      </div>
  )
}

export default FriendPageList