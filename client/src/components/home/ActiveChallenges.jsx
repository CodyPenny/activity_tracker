import React, { useEffect, useState, useContext, useCallback } from 'react'
import { getChallengeMemberCount, getUserChallengeCollection } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider'
import { limitToFirst, query, get } from "firebase/database";
import { getChallenge } from '../../firebase/challenge';
import ActiveChallengeItem from './ActiveChallengeItem'
import { Flex, Center } from '@chakra-ui/react'
import { onValue } from "firebase/database";

const ActiveChallenges = () => {
  const { user }   = useContext(UserContext)
  const [ challenges, setChallenges ] = useState([])

  /**
   * Looks up the challenges associated with the user, then collects
   * the data for each challenge
   * It runs another query to lookup the number of participants for each challenge
   * Using 'onValue" to add listener to challenger
   * Will update the state if there are new challenges for the user
   */
  const updateChallenges = async () => {
    console.log('updating challenges')
    try {
        // gets all the challenges for this user
        const u_c_ref = getUserChallengeCollection( user.uid )
        //const snapshot= await get( query( u_c_ref, limitToFirst(8)))
        onValue( u_c_ref, (snapshot) => {
          const challenge_keys = [] 
          snapshot.forEach( doc => {
              challenge_keys.push(doc.key)
          })

          Promise.all( challenge_keys.map( async (cuid) => { 
              return await getChallenge( cuid )
          }))
          .then((new_challenge_data) => {
              Promise.all( challenge_keys.map( async (id) => {
                  return await getChallengeMemberCount( id )
              }))
              .then(( num => {
                  for (let i = 0; i < new_challenge_data.length; i++) {
                      new_challenge_data[i].member_count = num[i]
                  }
                  setChallenges([...new_challenge_data])                
              }))
          })
      })

    } catch (error) {
        console.error('updateChallenges error:', error)
    }
  }

  useEffect( () => {
      if ( user ) {
       updateChallenges()
      }
  }, [])

  return (
    <Flex
      flexDir="column"
      bg="brand.140"
      p="1rem"
      rounded="10px"
      overflowY="hidden"
      fontSize={['md', 'xl']}
      position="relative"
      height="100%"
    >
        <Center
          pb="1rem"
          fontSize={["md", "lg"]}
          fontWeight="600"
        >
            Active Challenges
        </Center>
        <Flex
          justifyContent="space-around"
          fontWeight="500"
          fontSize={["sm", "md"]}
          mb=".5rem"
        >
            {["Challenge", "Members", "Duration"].map((title, i) => (
                <Center key={i} >{title}</Center>
            ))}
        </Flex>
        <Flex
          flexDir="column"
          gap=".5rem"
          overflowY="auto"
        >
            { challenges.length > 0 && challenges.map((item, i) => (
                <ActiveChallengeItem 
                    key={i}
                    data={item}
                    updateChallenges={updateChallenges}
                />
            ))
            }
        </Flex>
    </Flex>
  )
}

export default React.memo(ActiveChallenges)