import React from 'react'
import { Box, SimpleGrid, Button, useDisclosure } from '@chakra-ui/react'
import ActiveChallengeModal from './ActiveChallengeModal'

const ActiveChallengeItem = ({data}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button
      onClick={() => {
        console.log('data ', data)
        onOpen()
      }
      }
    >
      <SimpleGrid
        columns="3"
        pt=".8rem"
        pb=".8rem"
        fontSize={["xs", "sm"]}
        width="100%"
        backgroundColor="transparent"
      >
          <Box textAlign="left">{data.name}</Box>
          <Box textAlign="center">{data.member_count}</Box>
          <Box textAlign="right">{data.duration} day(s)</Box>
      </SimpleGrid>
      <ActiveChallengeModal 
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Button>
  )
}

export default ActiveChallengeItem