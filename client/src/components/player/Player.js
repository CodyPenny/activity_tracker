import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'

const Player = ({data, streak}) => {
  return (
    <SimpleGrid
      gridTemplateColumns= "1fr 1fr"
    >
      <Box >{data.name}</Box>
      <Box >{data.streak}/{streak}</Box>
    </SimpleGrid>
  )
}

export default Player