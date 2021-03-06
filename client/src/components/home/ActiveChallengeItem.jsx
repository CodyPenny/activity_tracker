import React from 'react'
import { Box, SimpleGrid, Button, useDisclosure } from '@chakra-ui/react'
import ActiveChallengeModal from './ActiveChallengeModal'

/**
 * Itemized challenge
 * @param {*} data challenge details
 * @returns 
 */
const ActiveChallengeItem = ({ data }) => {
  const { name, member_count, duration } = data
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button
      height={['2.5rem', '3rem']}
      onClick={onOpen}
    >
      <SimpleGrid
        columns="3"
        pt=".8rem"
        pb=".8rem"
        fontSize={["xs", "sm"]}
        width="100%"
        backgroundColor="transparent"
      >
          <Box textAlign="left">{name}</Box>
          <Box textAlign="center">{member_count}</Box>
          <Box textAlign="right">{duration} {duration > 1 ? "days" : "day"}</Box>
      </SimpleGrid>
      <ActiveChallengeModal 
        onClose={onClose}
        isOpen={isOpen}
        data={data}
      />
    </Button>
  )
}

export default React.memo(ActiveChallengeItem)