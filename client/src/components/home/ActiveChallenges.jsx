import React, { useState } from 'react'
import { Center, Flex } from '@chakra-ui/react'
import ActiveChallengeItem from './ActiveChallengeItem'

const ActiveChallenges = () => {
  const [ challenges, setChallenges ] = useState(["A", "B", "C", "D", "E", "A", "B", "C", "A", "B", "C","A", "B", "C","A", "B", "C",])

  return (
    <Flex
      flexDir="column"
      bg="brand.700"
      p="1rem"
      rounded="10px"
      overflowY="scroll"
    >
        <Center
          p="1rem"
          fontSize={["md", "lg"]}
          fontWeight="600"
        >
            Active Challenges
        </Center>
        <Flex
          justifyContent="space-around"
          fontWeight="600"
        >
            {["Challenge", "Members", "Duration"].map((title, i) => (
                <Center key={i} >{title}</Center>
            ))}
        </Flex>
        <Flex
          flexDir="column"
          gap=".5rem"
          pt="1rem"
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