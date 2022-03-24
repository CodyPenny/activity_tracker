import React, { useEffect, useContext } from 'react' 
import { Grid, GridItem, Text } from '@chakra-ui/react'
import ChallangeForm from './ChallangeForm'
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

const BuildChallenge = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken && user.user) {
        navigate('/buildChallenge')
    }

    if (!authToken) {
        navigate('/login')
    }
  }, [])

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