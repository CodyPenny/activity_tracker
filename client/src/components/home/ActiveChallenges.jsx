import React, { useState } from 'react'
import { Center, Flex } from '@chakra-ui/react'
import ActiveChallengeItem from './ActiveChallengeItem'

const ActiveChallenges = () => {
  const [ challenges, setChallenges ] = useState(["A", "B", "C"])
  return (
    <Flex
      flexDir="column"
    >
        <Center>
            Active Challenges
        </Center>
        <Flex
          justifyContent="space-between"
        >
            <Center>
                Challenge
            </Center>
            <Center>
                Members
            </Center>
            <Center>
                Duration
            </Center>
        </Flex>
        <Flex
          flexDir="column"
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