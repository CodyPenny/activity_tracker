import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Avatar,Grid, GridItem, Text, useBreakpointValue, Flex, Center } from '@chakra-ui/react';

import test_pic from '../../../static/avatar.png'
import NavButton from './NavButton.jsx';
import Stats from './Stats.jsx';
import ActiveChallenges from './ActiveChallenges.jsx';

// Components + Styles
// import ActiveChallenges from './ActiveChallenges.jsx';

const Home = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })

  /**
   * If token exists, remain on the page, or be pushed to the login screen
   */
  useEffect(() => {
    console.log('test in Home',  user)
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
        navigate('/home')
    }

    if (!authToken) {
        navigate('/login')
    }
  }, [])

  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr minmax(0, 5fr) 1fr' //prevents row blowout
    pr="10%" 
    pl="10%" 
    >
      <GridItem 
        pt="5%"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            name={user && user.user.displayName}
            src={user && user.user.photoURL}
            size={avatarSize}
          />
        </Flex>
      </GridItem>
         
      <GridItem>
        <Flex
          flexDir="column"
          height="100%"
          gap="1.5rem"
          pb="1.5rem"
        >
          <Center 
            fontSize={['md', 'xl']}
            fontWeight="600"
            pt=".5rem"
          >
            {user.user.displayName}
          </Center>
          <Stats />
          <ActiveChallenges />
        </Flex>
      </GridItem>
      
      <GridItem
      >
        <NavButton />
      </GridItem>
    </Grid>
  );
};

export default Home;