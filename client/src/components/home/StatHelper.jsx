import React from 'react'
import { Center, Flex, Box } from '@chakra-ui/react'

const StatHelper = () => {
  return (
    <Center
            bg="brand.700"
            rounded="10px"
            flexDir="column"
            p="1rem"
            fontWeight="600"
        >
            Completed
            <Center
              bg="brand.200"
              width="100%"
              p=".2rem"
              m=".8rem"
            >
                0
            </Center>
        </Center>
  )
}

export default StatHelper