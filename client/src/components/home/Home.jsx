import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Avatar,Grid, GridItem, useBreakpointValue, Flex, Center, useDisclosure, Spinner } from '@chakra-ui/react';

import NavButton from './NavButton.jsx';
import Stats from './Stats.jsx';
import ActiveChallenges from './ActiveChallenges.jsx';
import EditAccount from '../profile/EditAccount.jsx';

/**
 * 
 * @returns Landing page
 */
const Home = () => {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const avatarSize = useBreakpointValue({ base: 'lg', sm: 'xl' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  /**
   * If token exists, remain on the page, or be pushed to the login screen
   */
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken && user) {
        navigate('/home')
    }

    if (!authToken) {
        navigate('/login')
    }

  }, [])

  return (
    <>
    {  user  ? 
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
                name={user.displayName}
                src={user.photoURL}
                size={avatarSize}
                cursor="pointer"
                onClick={onOpen}
              />
              <EditAccount 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                uid={user.uid}
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
                { user.displayName }
              </Center>
              <Stats/> 
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
      <Center mt="45%">
         <Spinner size='xl' />
      </Center>
      </>
    )
    
  }
  </>
  );
};

export default Home;