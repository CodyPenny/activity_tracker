import React from 'react'
import { Center, Flex, Box } from '@chakra-ui/react'

const StatHelper = ({stat}) => {
  return (
    <Center
            bg="brand.700"
            rounded="10px"
            flexDir="column"
            p="1rem"
            fontWeight="600"
        >
            {stat.name}
            <Center
              bg="brand.200"
              width="100%"
              p=".2rem"
              m=".8rem"
              rounded="10px"
            >
                {stat.val}
            </Center>
        </Center>
  )
}

export default StatHelper