import React, { useEffect, useState, useContext } from 'react'
import { getAllChallengesForUser } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider'
import ActiveChallengeItem from './ActiveChallengeItem'
import { Flex, Center,  } from '@chakra-ui/react'

const ActiveChallenges = () => {
  const { user } = useContext(UserContext)
  const [ challenges, setChallenges ] = useState([])
  const [ participants, setParticipants ] = useState([])

  const updateChallenges = async ( uid ) => {
    let result = await getAllChallengesForUser( uid )
  }


  useEffect(() => {
      if (user) {
          // get all the challenges for the user
          // set a limit to 5 per load
          // get member count for each challenge
          updateChallenges(user.uid)
      }

  }, [])

  return (
    <Flex
      flexDir="column"
      bg="brand.700"
      p="1rem"
      rounded="10px"
      overflowY="scroll"
      fontSize={['md', 'xl']}
    >
        <Center
          p="1rem"
          fontSize={["md", "xl"]}
          fontWeight="600"
        >
            Active Challenges
        </Center>
        <Flex
          justifyContent="space-around"
          fontWeight="500"
          fontSize={["sm", "lg"]}
        >
            {["Challenge", "Members", "Duration"].map((title, i) => (
                <Center key={i} >{title}</Center>
            ))}
        </Flex>
        <Flex
          flexDir="column"
          gap=".5rem"
          pt="1rem"
          fontSize={["xs", "md"]}
        >
            { challenges.map((item, i) => (
                <ActiveChallengeItem 
                    key={i}
                />
            ))}
        </Flex>
    </Flex>
  )
}

export default ActiveChallenges