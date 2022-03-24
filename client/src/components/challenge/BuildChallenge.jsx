import React, { useState } from 'react' 
import { Grid, GridItem, Text } from '@chakra-ui/react'
import ChallangeForm from './ChallangeForm'

const BuildChallenge = () => {

  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr 6fr'
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
                Create a Challenge
            </Text>
        </GridItem>
        <GridItem
          pt={"1rem"}
        >
            <ChallangeForm />
        </GridItem>
        <GridItem>
           
        </GridItem>

    </Grid>
  )
}

export default BuildChallenge