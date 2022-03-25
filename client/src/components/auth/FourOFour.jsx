import React from 'react'
import { Grid, GridItem, Text } from '@chakra-ui/react'

const FourOFour = () => {
  return (
    <Grid
    h='100%'
    bg="brand.100"
    pr="10%" 
    pl="10%" 
    >
       <GridItem
          ml="auto"
          mr="auto"
        >
          <Text 
              textAlign="center" 
              fontSize={["xl", "2xl"]}
              color="#464646"
              mt={["20%", "25%"]}
          >
              404- Not Found
          </Text>
        </GridItem>
    </Grid>
  )
}

export default FourOFour