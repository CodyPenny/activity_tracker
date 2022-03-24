import React, { useEffect, useContext } from 'react';
import { GridItem, Grid, Text } from '@chakra-ui/react';
import NavButton from '../home/NavButton';
import FriendPageList from './FriendPageList';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

const FriendPage = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    //console.log('test in Home',  user)
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken && user.user) {
        navigate('/friends')
    }

    if (!authToken) {
        navigate('/login')
    }
  }, [])

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