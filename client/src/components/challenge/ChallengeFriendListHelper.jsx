import React from 'react'
import { Avatar, Flex, Box, Text, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { MdPersonAddAlt1 } from 'react-icons/md'

const ChallengeFriendListHelper = ({ friend, cuid }) => {
  const avatarSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  const clickHandler = () => {
      console.log('in friend', friend.uid, cuid)
  }
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
      <Center>
        <IconButton
            icon={<MdPersonAddAlt1 />}
            onClick={clickHandler}
        />
      </Center>

    </Flex>
  )
}

export default ChallengeFriendListHelper