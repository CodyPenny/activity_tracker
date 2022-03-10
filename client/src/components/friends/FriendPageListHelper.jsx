import React from 'react'
import { Avatar, Flex, Box, Text, useBreakpointValue } from '@chakra-ui/react'

const FriendPageListHelper = ({ friend }) => {
  const avatarSize = useBreakpointValue({ base: 'md', sm: 'lg' })
  console.log('friend in friendpagelisthelper ', friend)
  return (
    <Flex 
      pb={[".5rem", "1rem"]}
      pl={[".5rem", "1rem"]}
      pt={[".5rem", "1rem"]}
      backgroundColor="brand.600"
      alignItems="center"
    >
      <Avatar 
        name={friend.displayName}
        src={friend.photoURL}
        size={avatarSize}
      />
      <Box
        display="flex"
        flexDirection="column"
       
      >
        <Text 
          fontSize={["lg", "xl"]}
          p='1rem' 
          color='brand.400'
        >
          {friend.displayName}
        </Text>
      </Box>
    </Flex>
  )
}

export default FriendPageListHelper