import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const ActiveChallengeItem = ({data}) => {
  return (
    <SimpleGrid
      columns="3"
      bg="brand.200"
      rounded="3px"
      p=".2rem"
    >
        <Box pl=".3rem">{data.name}</Box>
        <Box textAlign="center">{data.member_count}</Box>
        <Box textAlign="center">{data.duration} day(s)</Box>
    </SimpleGrid>
  )
}

export default ActiveChallengeItem