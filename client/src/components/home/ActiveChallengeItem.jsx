import { Box, SimpleGrid, Button } from '@chakra-ui/react'
import React from 'react'

const ActiveChallengeItem = ({data}) => {
  return (
    <Button
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
    </Button>
  )
}

export default ActiveChallengeItem