import React, { useContext } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { Grid, GridItem, Text } from '@chakra-ui/react'
import { useParams } from 'react-router'
import ChallengeFriendListHelper from './ChallengeFriendListHelper.jsx';

const ChallengeAddFriends = () => {
  const { friends } = useContext(UserContext);
  let { cuid } = useParams();

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
                ADD FRIENDS TO YOUR CHALLENGE
            </Text>
        </GridItem>
        <GridItem
            mt="1rem"
        >
           { friends.map((friend, i) => (
              <ChallengeFriendListHelper friend={friend} key={i} cuid={cuid}/>
            ))
           }
        </GridItem>
        <GridItem> 
            
        </GridItem>
    </Grid>
  )
}

export default ChallengeAddFriends