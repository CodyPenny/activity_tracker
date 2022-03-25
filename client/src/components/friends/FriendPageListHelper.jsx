import React from 'react'
import { Avatar, Flex, Box, Text, useBreakpointValue } from '@chakra-ui/react'

const FriendPageListHelper = ({ friend }) => {
  const avatarSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  return (
    <Flex 
      pb={[".5rem", "1rem"]}
      pl={[".5rem", "1rem"]}
      pt={[".5rem", "1rem"]}
      mt={[".5rem", "1rem"]}
      backgroundColor="brand.310"
      alignItems="center"
      rounded="5px"
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
          fontSize={["md", "lg"]}
          p='1rem' 
          color='brand.800'
        >
          {friend.displayName}
        </Text>
      </Box>
    </Flex>
  )
}

export default FriendPageListHelper