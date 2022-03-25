import React from 'react'
import FriendAvatar from './FriendAvatar'
import { Stack, Center, Text, Spinner } from '@chakra-ui/react'

//TODO: add loader

const SearchFriendList = ({ friends, isSubmitting }) => {

  return (
    <Stack 
        flexWrap="wrap" 
        flexDir="row" 
        gap=".5rem" 
        alignItems="baseline"
    > { isSubmitting ? (
      <Spinner size='lg'/>
    ) : friends.length > 0 ? friends.map((friend, i) => (
            <FriendAvatar 
                key={i} 
                name={friend.displayName} 
                photoURL={friend.photoURL}
                uid={friend.uid}
            />
        )) : (
          <>
            <Center
              textAlign="center"
            >
              <Text>No friends</Text>
            </Center>
          </>
        )}
    </Stack>
  )
}

export default SearchFriendList