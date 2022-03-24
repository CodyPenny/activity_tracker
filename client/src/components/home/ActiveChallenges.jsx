import React, { useEffect, useState, useContext } from 'react'
import { getChallengeMemberCount, getUserChallengeCollection } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider'
import { limitToFirst, query, get } from "firebase/database";
import { getChallenge } from '../../firebase/challenge';
import ActiveChallengeItem from './ActiveChallengeItem'
import { Flex, Center, Button } from '@chakra-ui/react'
import { getRef } from '../../firebase';
import { onValue } from 'firebase/database';

const ActiveChallenges = () => {
  const user  = useContext(UserContext)
  const [ challenges, setChallenges ] = useState([])
  const [ showSpinner, setShowSpinner ] = useState(true)

  //TODO: add listener to challenger

  /**
   * Looks up the challenges associated with the user, then collects
   * the data for each challenge
   * It runs another query to lookup the number of participants for each challenge
   * @param {*} uid user's uid
   */
  const updateChallenges = async ( uid ) => {
    const challenge_keys = [] 
    try {
        // gets all the challenges for this user
        const u_c_ref = getUserChallengeCollection( uid )

        const snapshot= await get( query( u_c_ref, limitToFirst(8)))

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
                setShowSpinner(false)
                
            }))
        })

    } catch (error) {
        console.error('updateChallenges error:', error)
    }
  }


  useEffect( () => {
      if (user.user) {
       updateChallenges(user.user.uid)
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
          //visibility={showSpinner ? "hidden" : "visible"}
        >
            { challenges.map((item, i) => (
                <ActiveChallengeItem 
                    key={i}
                    data={item}
                />
            ))}
        </Flex>
        {/* <Button
          bg="brand.700"
          position="absolute"
          width="92%"
          height="92%"
          overflow="hidden"
          //isLoading={showSpinner}
          //visibility={showSpinner ? "visible" : "hidden"}
        >
        </Button> */}
    </Flex>
  )
}

export default ActiveChallenges