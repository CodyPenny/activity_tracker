import React, { useContext, useEffect } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { Grid, GridItem, Text } from '@chakra-ui/react'
import { useParams } from 'react-router'
import ChallengeFriendListHelper from './ChallengeFriendListHelper.jsx';
import ChallengeAddFriendButton from './ChallengeAddFriendButton.jsx';

const ChallengeAddFriends = () => {
  const user = useContext(UserContext);
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
           { user.friends.length > 0 && user.friends.map((friend, i) => (
              <ChallengeFriendListHelper friend={friend} key={i} cuid={cuid}/>
            ))
           }
        </GridItem>
        <GridItem> 
            <ChallengeAddFriendButton 
                cuid={cuid}
                uid={user.user.uid}
            />
        </GridItem>
    </Grid>
  )
}

export default ChallengeAddFriends