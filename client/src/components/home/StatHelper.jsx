import React from 'react'
import { Center, Button } from '@chakra-ui/react'

const StatHelper = ({ stat }) => {
  return (
    <Center
            bg="brand.140"
            rounded="8px"
            flexDir="column"
            p="1rem"
            width="30%"
        >
            {stat.name}

            <Button
              variant='solid'
              bg="brand.200"
              width="100%"
              mt=".8rem"
              size="md"
            >
                {stat.val}
            </Button>

    </Center>
  )
}

export default StatHelper