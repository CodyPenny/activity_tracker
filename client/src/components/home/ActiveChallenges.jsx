import React, { useEffect, useState, useContext } from 'react'
import { getChallengeMemberCount, getUserChallengeCollection } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider'
import { onValue } from "firebase/database";
import { getChallenge } from '../../firebase/challenge';
import ActiveChallengeItem from './ActiveChallengeItem'
import { Flex, Center,  } from '@chakra-ui/react'

const ActiveChallenges = () => {
  const { user } = useContext(UserContext)
  const [ challenges, setChallenges ] = useState([])

  /**
   * Looks up the challenges associated with the user, then collects
   * the data for each challenge
   * It runs another query to lookup the number of participants for each challenge
   * @param {*} uid user's uid
   */
  const updateChallenges = async ( uid ) => {
    const challenge_keys = []
    try {
        const u_c_ref = getUserChallengeCollection( uid )
        onValue( u_c_ref, (snapshot) => {
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
      if (user) {
       updateChallenges(user.uid)
      }
  }, [])

  return (
    <Flex
      flexDir="column"
      bg="brand.700"
      p="1rem"
      rounded="10px"
      overflowY="hidden"
      fontSize={['md', 'xl']}
    >
        <Center
          p="1rem"
          fontSize={["md", "xl"]}
          fontWeight="600"
        >
            Active Challenges
        </Center>
        <Flex
          justifyContent="space-around"
          fontWeight="500"
          fontSize={["sm", "lg"]}
          mb=".5rem"
        >
            {["Challenge", "Members", "Duration"].map((title, i) => (
                <Center key={i} >{title}</Center>
            ))}
        </Flex>
        <Flex
          flexDir="column"
          gap=".5rem"
          fontSize={["xs", "md"]}
          overflowY="scroll"
        >
            { challenges.map((item, i) => (
                <ActiveChallengeItem 
                    key={i}
                    data={item}
                />
            ))}
        </Flex>
    </Flex>
  )
}

export default ActiveChallenges