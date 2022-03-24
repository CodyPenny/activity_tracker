import React from 'react'
import { Center, Button, useBreakpointValue } from '@chakra-ui/react'

const StatHelper = ({stat, show}) => {
  const buttonSize = useBreakpointValue({ base: 'md', sm: 'lg' })
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
              //size={buttonSize}
              size="md"
              isLoading={show}
            >
                {stat.val}
            </Button>

    </Center>
  )
}

export default StatHelper