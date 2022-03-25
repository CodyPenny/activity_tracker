import React, { useCallback } from 'react'
import { Box, SimpleGrid, Button, useDisclosure } from '@chakra-ui/react'
import ActiveChallengeModal from './ActiveChallengeModal'

const ActiveChallengeItem = ({data, updateChallenges}) => {
  const { name, member_count, duration } = data
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const openModal = () => {
  //   console.log('data going to modal from active chall item ', data)
  //   onOpen()
  // }

  return (
    <Button
      height={['2.5rem', '3rem']}
      onClick={onOpen}
      //onClick={()=>openModal(i)}
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
          <Box textAlign="right">{duration} day(s)</Box>
      </SimpleGrid>
      <ActiveChallengeModal 
        onClose={onClose}
        isOpen={isOpen}
        data={data}
        updateChallenges={updateChallenges}
      />
    </Button>
  )
}

export default React.memo(ActiveChallengeItem)