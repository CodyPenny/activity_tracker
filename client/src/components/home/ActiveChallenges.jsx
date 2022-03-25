import React, { useEffect, useState, useContext } from 'react'
import { getChallengeMemberCount, getUserChallengeCollection } from '../../firebase/challenge'
import { UserContext } from '../providers/UsersProvider'
import { limitToFirst, query, get } from "firebase/database";
import { getChallenge } from '../../firebase/challenge';
import ActiveChallengeItem from './ActiveChallengeItem'
import { Flex, Center, Button, useDisclosure  } from '@chakra-ui/react'
import ActiveChallengeModal from './ActiveChallengeModal'

const ActiveChallenges = () => {
  const user  = useContext(UserContext)
  const [ challenges, setChallenges ] = useState([])
  //const { isOpen, onOpen, onClose } = useDisclosure()
  const [ selectedChallenge, setSelectedChallenge ] = useState({})

  // const openModal = (i) => {
  //   console.log('data going to modal from active chall item ', i, challenges[i])
  //   setSelectedChallenge(challenges[i])
  //   onOpen()
  // }

  //TODO: add listener to challenger

  /**
   * Looks up the challenges associated with the user, then collects
   * the data for each challenge
   * It runs another query to lookup the number of participants for each challenge
   * @param {*} uid user's uid
   */
  const updateChallenges = async ( uid ) => {
    console.log('updating challenges')
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
                // setShowSpinner(false)
                
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
                    //openModal={openModal}
                    i={i}
                    updateChallenges={updateChallenges}
                />
            ))}
        </Flex>
        {/* <ActiveChallengeModal 
          onClose={onClose}
          isOpen={isOpen}
          data={selectedChallenge}
          updateChallenges={updateChallenges}
      /> */}
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