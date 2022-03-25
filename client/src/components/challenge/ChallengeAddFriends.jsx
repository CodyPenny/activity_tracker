import React, { useContext, useEffect } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { Grid, GridItem, Text, Box } from '@chakra-ui/react'
import { useParams } from 'react-router'
import ChallengeFriendListHelper from './ChallengeFriendListHelper.jsx';
import ChallengeAddFriendButton from './ChallengeAddFriendButton.jsx';

const ChallengeAddFriends = () => {
  const { friends } = useContext(UserContext);
  let navigate = useNavigate();
  let { cuid } = useParams();
    //console.log('user in challenge add friends', user)

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

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
                pt={"15%"}
            >
                ADD FRIENDS TO YOUR CHALLENGE
            </Text>
        </GridItem>
        <GridItem
            mt="1rem"
        >
           { friends.length > 0 ? friends.map((friend, i) => (
              <ChallengeFriendListHelper 
                friend={friend} 
                key={i} 
                cuid={cuid}
              />
            )) : (
                <>
                <Box
                  textAlign="center"
                  mt="20%"
                >
                    <Text>No Added Friends.</Text>

                </Box>
                </>
            )
           }
        </GridItem>
        <GridItem> 
            <ChallengeAddFriendButton 
                cuid={cuid}
            />
        </GridItem>
    </Grid>
  )
}

export default ChallengeAddFriends