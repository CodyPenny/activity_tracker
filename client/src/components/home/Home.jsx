import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Avatar,Grid, GridItem, Text, useBreakpointValue, Flex } from '@chakra-ui/react';

import test_pic from '../../../static/avatar.png'
import NavButton from './NavButton.jsx';
import Stats from './Stats.jsx';

// Components + Styles
// import ActiveChallenges from './ActiveChallenges.jsx';

const Home = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const avatarSize = useBreakpointValue({ base: 'md', sm: 'lg' })

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
    templateRows='1fr 5fr 1fr'
    pr="10%" 
    pl="10%" 
    >
      <GridItem 
        pt="5%"
        textAlign="center"
        fontSize={['md', 'lg']}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            name={user.user.displayName}
            src={user.user.photoURL}
            size={avatarSize}
          />
          <Text 
            fontWeight="semibold"
            pt=".5rem"
          >
            display name
          </Text>
        </Flex>
      </GridItem>
         
      <GridItem>
        <Flex
          flexDir="column"
        >
          <Stats />

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