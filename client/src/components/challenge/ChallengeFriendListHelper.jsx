import React, { useState } from 'react'
import { Avatar, Flex, Box, Text, useBreakpointValue, IconButton, Center } from '@chakra-ui/react'
import { MdPersonAddAlt1, MdCheck } from 'react-icons/md'

const ChallengeFriendListHelper = ({ friend, cuid }) => {
  const [showConfirmation, setShowConfirmation ] = useState(false)
  const [ showLoading, setShowLoading ] = useState(false)
  const avatarSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  const clickHandler = async () => {
      console.log('in friend', friend.id, cuid)
      setShowLoading(true)
      
      // add friend
      // then show check

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
        width="60%"
      >
        <Text 
          fontSize={["lg", "xl"]}
          p='1rem' 
          color='brand.400'
        >
          {friend.displayName}
        </Text>
      </Box>
      <Center
        position="relative"
      >
        <IconButton
            position="absolute"
            icon={<MdPersonAddAlt1 />}
            onClick={clickHandler}
            isLoading={showLoading}
        />
        <IconButton
            visibility={showConfirmation ? 'visible' : 'hidden'}
            icon={<MdCheck />}
        />
      </Center>

    </Flex>
  )
}

export default ChallengeFriendListHelper