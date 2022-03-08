import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Avatar,Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';

import test_pic from '../../../static/avatar.png'
import NavButton from './NavButton.jsx';

// Components + Styles
// import AddFriend from './AddFriend.jsx';
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
    templateRows='1fr 1fr 3fr 1fr'
    >
      <GridItem 
        pl="10%"
        pr="10%"
        pt="15%"
        textAlign="center"
      >
        <Avatar
          name={"name"}
          src={test_pic}
          // name={user.user.displayName}
          // src={user.user.photoURL}
          size={avatarSize}
        />
      </GridItem>
      <GridItem
        textAlign="center"
        mt="1rem"
        fontSize={['md', 'xl']}
      >
        <Text fontWeight="semibold">display name</Text>
      </GridItem>
         
      <GridItem>
        {/* <AddFriend /> */}
      </GridItem>
      <GridItem
        pl="5%"
        pr="5%"
        mt="8%"
      >
        <NavButton />
      </GridItem>
    </Grid>
  );
};

export default Home;