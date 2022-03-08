import React from 'react';
import { GridItem, Grid, Text } from '@chakra-ui/react';
import NavButton from '../home/NavButton';
import FriendPageList from './FriendPageList';


const FriendPage = () => {

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
                FRIENDS
            </Text>
        </GridItem>
        <GridItem
            mt="1rem"
        >
            <FriendPageList />
        </GridItem>
        <GridItem>
            <NavButton />
        </GridItem>
    </Grid>
  )
}

export default FriendPage