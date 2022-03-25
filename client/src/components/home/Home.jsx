import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Avatar,Grid, GridItem, useBreakpointValue, Flex, Center, useDisclosure, Spinner } from '@chakra-ui/react';

import test_pic from '../../../static/avatar.png'
import NavButton from './NavButton.jsx';
import Stats from './Stats.jsx';
import ActiveChallenges from './ActiveChallenges.jsx';
import EditAccount from '../profile/EditAccount.jsx';

/**
 * 
 * @returns Landing page
 */
const Home = () => {
  //const { user } = useContext(UserContext);
  const [ theUser, setUser ] = useState(useContext(UserContext).user)
  let navigate = useNavigate();
  const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const openEditAccountPage = () => {
  //   console.log('opening')
  //   onOpen()
  // }

  /**
   * If token exists, remain on the page, or be pushed to the login screen
   */
  useEffect(() => {
    console.log('test in Home',  theUser)
    let authToken = sessionStorage.getItem('Auth Token')

    //console.log("going home?", authToken, user.user)
    if (authToken && theUser) {
        navigate('/home')
    }

    if (!authToken) {
        navigate('/login')
    }

    if(!theUser.uid){
      console.log("user is null", theUser)
      navigate('/notFound')
    }

  }, [])

  return (
    <>
    {  theUser  ? 
      (
        <Grid
        h='100%'
        bg="brand.100"
        templateRows='1fr minmax(0, 5fr) 1fr' //prevents row blowout
        pr="10%" 
        pl="10%" 
        >
          <GridItem 
            pt={["10%", "5%"]}
          >
            <Flex
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                name={theUser.displayName}
                src={theUser.photoURL}
                size={avatarSize}
                cursor="pointer"
                onClick={onOpen}
              />
              <EditAccount 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                uid={theUser.uid}
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
                { theUser.displayName }
              </Center>
              <Stats user={theUser}/> 
              <ActiveChallenges />
            </Flex>
          </GridItem>
          
          <GridItem
          >
            <NavButton />
          </GridItem>
        </Grid> 
    ) : (
      <>
         <Spinner size='xl' />
      </>
    )
    
  }
  </>
  );
};

export default Home;