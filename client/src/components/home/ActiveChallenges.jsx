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