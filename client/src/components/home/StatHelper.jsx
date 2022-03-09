import React from 'react'
import { Center, Button } from '@chakra-ui/react'

const StatHelper = ({stat, show}) => {
  return (
    <Center
            bg="brand.700"
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
              m=".8rem"
              isLoading={show}
            >
                {stat.val}
            </Button>

    </Center>
  )
}

export default StatHelper