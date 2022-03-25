import React from 'react'
import FriendAvatar from './FriendAvatar'
import { Stack, Text, Spinner, Box } from '@chakra-ui/react'


const SearchFriendList = ({ friends, isSubmitting }) => {

  return (
    <Stack 
        flexWrap="wrap" 
        flexDir="row" 
        gap=".5rem" 
        alignItems="baseline"
    > { 
        isSubmitting ? ( <Spinner size='lg'/> ) : 
        friends.length > 0 ? friends.map((friend, i) => (
            <FriendAvatar 
                key={i} 
                name={friend.displayName} 
                photoURL={friend.photoURL}
                uid={friend.uid}
            />
        )) : (
          <Box
            ml="auto"
            mr="auto"
          >
            <Text>No Matches</Text>
          </Box>
        )
      }
    </Stack>
  )
}

export default SearchFriendList