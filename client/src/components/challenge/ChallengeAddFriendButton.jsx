import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { addUserToChallenge } from '../../firebase/challenge'


const ChallengeAddFriendButton = ({cuid, uid}) => {
  const [ inProgress, setInProgress ] = useState(false)
  let navigate = useNavigate()

  /**
   * Add user to the challenge last due to db listener on user's challenge root
   */
  const finalizeChallenge = async () => {
    setInProgress(true)
    await addUserToChallenge( uid, cuid )
    setInProgress(false)
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