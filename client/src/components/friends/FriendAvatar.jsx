import React, { useState } from 'react'
import { Avatar, Box, Text, Button } from '@chakra-ui/react'
import { StyledFriendAdded } from '../styles/friendStyles'
import { set } from 'lodash'

const FriendAvatar = ({name, photoURL, id}) => {
    const [showConfirmation, setShowConfirmation ] = useState(false)
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
        <Avatar size='xl' src={photoURL}/>
        <Text pt=".5rem">{name}</Text>

        <StyledFriendAdded
            style={{
                visibility: showConfirmation ? 'visible' : 'hidden'
            }}
        >
            Request Sent
        </StyledFriendAdded>
    </Button>
  )
}

export default FriendAvatar