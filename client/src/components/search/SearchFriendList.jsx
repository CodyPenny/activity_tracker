import React from 'react'
import FriendAvatar from '../friends/FriendAvatar'
import { Stack } from '@chakra-ui/react'
import test_pic from '../../../static/avatar.png'

//TODO: add loader

const SearchFriendList = ({friends}) => {

  return (
    <Stack 
        flexWrap="wrap" 
        flexDir="row" 
        gap=".5rem" 
        alignItems="baseline"
    >
        {friends && friends.map((friend, i) => (
            <FriendAvatar 
                key={i} 
                name={friend.displayName} 
                photoURL={friend.photoURL}
                id={friend.id}
            />
        ))}
    </Stack>
  )
}

export default SearchFriendList