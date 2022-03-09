import React from 'react'
import { Center, Flex, Box } from '@chakra-ui/react'

const StatHelper = ({stat}) => {
  return (
    <Center
            bg="brand.700"
            rounded="8px"
            flexDir="column"
            p="1rem"
            fontWeight="600"
            width="30%"
        >
            {stat.name}
            <Center
              bg="brand.200"
              width="100%"
              p=".2rem"
              m=".8rem"
              rounded="3px"
            >
                {stat.val}
            </Center>
        </Center>
  )
}

export default StatHelper