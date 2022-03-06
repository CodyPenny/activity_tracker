import React from 'react'
import FriendAvatar from './FriendAvatar'
import { Stack } from '@chakra-ui/react'
import test_pic from '../../../static/avatar.png'

const SearchFriendList = () => {
  const testFriendList = [{name: "f1", photoURL:test_pic}, {name: "f2", photoURL:test_pic}, {name: "f3", photoURL:test_pic}, {name: "f4", photoURL:test_pic}]

  return (
    <Stack 
        flexWrap="wrap" 
        flexDir="row" 
        gap=".5rem" 
        alignItems="baseline"
    >
        {testFriendList.map((friend, i) => (
            <FriendAvatar 
                key={i} 
                name={friend.name} 
                photoURL={friend.photoURL}
                id={i}
            />
        ))}
    </Stack>
  )
}

export default SearchFriendList