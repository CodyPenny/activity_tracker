import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { addUserToChallenge } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider.jsx';


const ChallengeAddFriendButton = ({ cuid }) => {
  const [ inProgress, setInProgress ] = useState(false)
  const { user } = useContext(UserContext);
  let navigate = useNavigate()

  /**
   * Add user to the challenge last due to db listener on user's challenge root
   */
  const finalizeChallenge = async () => {
    setInProgress(true)
    await addUserToChallenge( user.uid, cuid, user.displayName )
    //setInProgress(false)
    navigate('/home')
    
  }

  return (
    <>
      <Button
        bg="brand.500"
        rounded="20px"
        variant="solid"
        width="100%"
        height="40px"
        fontSize={['sm', 'lg']}
        isLoading={inProgress}
        onClick={finalizeChallenge}
      >
        Submit Challenge
      </Button>
    
    </>
  )
}

export default ChallengeAddFriendButton