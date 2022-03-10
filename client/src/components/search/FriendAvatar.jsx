import React, { useState, useContext } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { Avatar, Text, Button, useBreakpointValue } from '@chakra-ui/react'
import { StyledFriendAdded } from '../styles/friendStyles'
import { addFriendToUser } from '../../firebase/friend.js';

/**
 * Friend avatar in the Search Friends page
 * @param {name, photoURL, id} user  
 * @returns 
 */
const FriendAvatar = ({name, photoURL, id}) => {
    const user = useContext(UserContext);
    const [showConfirmation, setShowConfirmation ] = useState(false)
    const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })
    const addFriend = () => {
        console.log('fid', id)
        console.log('uid', user.user.uid)
        //addFriendToUser(id, user.user.uid)
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
                Friend Added
            </Text>
        </StyledFriendAdded>
    </Button>
  )
}

export default FriendAvatar