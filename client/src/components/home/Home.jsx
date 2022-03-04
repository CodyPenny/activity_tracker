import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';

// Chakra + Forms
import { signOutOfApp } from '../../firebase/auth';
import { Avatar, Box, Flex, IconButton, Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';

import { MdPlaylistAdd, MdLogout, MdEdit, MdGroup } from 'react-icons/md';
import test_pic from '../../../static/avatar.png'

// Components + Styles
// import AddFriend from './AddFriend.jsx';
// import ActiveChallenges from './ActiveChallenges.jsx';

const Home = () => {
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })
  const iconSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  const sign_out = () => {
    signOutOfApp()
    navigate('/login')
  }
  /**
   * If token exists, remain on the page, or be pushed to the login screen
   */
  // useEffect(() => {
  //   let authToken = sessionStorage.getItem('Auth Token')

  //   if (authToken) {
  //       navigate('/profile')
  //   }

  //   if (!authToken) {
  //       navigate('/login')
  //   }
  // }, [])

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
          // name={user.displayName}
          // src={user.photoURL}
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
        <Box
          bg="brand.500"
          rounded="20px"
        >
          <Flex align="center" justify="center" justifyContent="space-evenly">
            <IconButton
              aria-label="Edit"
              icon={<MdEdit />}
              as={Link}
              to="/editProfile"
              variant="solid"
              bg="brand.500"
              size={iconSize}
            />
            <IconButton
              icon={<MdGroup />}
              as={Link}
              to="/friends"
              variant="solid"
              bg="brand.500"
              size={iconSize}
            />
            <IconButton
              icon={<MdPlaylistAdd />}
              as={Link}
              to="/challenge/create"
              variant="solid"
              bg="brand.500"
              size={iconSize}
            />
            <IconButton
              aria-label="sign out"
              icon={<MdLogout />}
              variant="solid"
              onClick={sign_out}
              bg="brand.500"
              size={iconSize}
            />
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Home;