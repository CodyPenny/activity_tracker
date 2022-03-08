import React from 'react'
import { Grid, GridItem, Text } from '@chakra-ui/react'

const ChallengeAddFriends = () => {

  return (
    <Grid
        h='100%'
        bg="brand.100"
        templateRows='1fr 5fr 1fr'
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
                mt={["40%", "45%"]}
            >
                ADD FRIENDS TO YOUR CHALLENGE
            </Text>
        </GridItem>
        <GridItem
            mt="1rem"
        >
           
        </GridItem>
        <GridItem>
            
        </GridItem>
    </Grid>
  )
}

export default ChallengeAddFriends