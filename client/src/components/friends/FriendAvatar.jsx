import React, { useState } from 'react'
import { Avatar, Text, Button, useBreakpointValue } from '@chakra-ui/react'
import { StyledFriendAdded } from '../styles/friendStyles'


const FriendAvatar = ({name, photoURL, id}) => {
    const [showConfirmation, setShowConfirmation ] = useState(false)
    const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })
    const addFriend = () => {
        console.log('key', id)
        setShowConfirmation(true)
    }

  return (
    <Button 
        h="100%" 
        flexDir={"column"} 
        p="1rem"
        onClick={addFriend}
    >
        <Avatar 
            size={avatarSize}
            src={photoURL}
        />
        <Text 
            fontSize={['sm', 'md']}
            pt=".5rem"
        >
            {name}
        </Text>

        <StyledFriendAdded
            style={{
                visibility: showConfirmation ? 'visible' : 'hidden'
            }}
        >
            <Text
            fontSize={['xs', 'md']}
            >
                Request Sent
            </Text>
        </StyledFriendAdded>
    </Button>
  )
}

export default FriendAvatar