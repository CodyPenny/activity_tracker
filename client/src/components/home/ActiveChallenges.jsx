import React from 'react'
import { Center, Flex } from '@chakra-ui/react'

const ActiveChallenges = () => {
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
    </Flex>
  )
}

export default ActiveChallenges