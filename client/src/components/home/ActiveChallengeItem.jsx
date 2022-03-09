import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const ActiveChallengeItem = () => {
  return (
    <SimpleGrid
      columns="3"
      bg="brand.200"
      rounded="3px"
      p=".2rem"
    >
        <Box pl=".3rem">1</Box>
        <Box textAlign="center">2</Box>
        <Box textAlign="center">3 day(s)</Box>
    </SimpleGrid>
  )
}

export default ActiveChallengeItem