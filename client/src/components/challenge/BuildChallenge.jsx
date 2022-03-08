import React, { useState } from 'react' 
import { Grid, GridItem, Text } from '@chakra-ui/react'
import ChallengeNav from './ChallengeNav'
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
                mt={["25%", "30%"]}
            >
                Create a Challenge
            </Text>
        </GridItem>
        <GridItem
          pt={"1rem"}
        >
            <ChallangeForm />
        </GridItem>
        {/* <GridItem>
            <ChallengeNav back={"/home"} next={"/"} handleSubmit={handleChallengeSubmit}/>
        </GridItem> */}

    </Grid>
  )
}

export default BuildChallenge