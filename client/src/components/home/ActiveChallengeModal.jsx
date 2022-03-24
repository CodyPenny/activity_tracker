import React, { useState, useEffect, useContext } from 'react'
import { Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Text, Divider, IconButton } from '@chakra-ui/react'
import { getStreakToChallenges, addStreakToChallenge } from '../../firebase/challenge'
import Player from '../player/Player'
import { FiPlus, FiCheck } from "react-icons/fi";
import { UserContext } from '../providers/UsersProvider'

const ActiveChallengeModal = ({isOpen, onClose, data}) => {
  const user  = useContext(UserContext)
  const [ challenges, setChallenges ] = useState({})
  const [ players, setPlayers ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isAdded, setIsAdded ] = useState(false)
  const [ isDone, setIsDone ] = useState(false)

  console.log("the data coming thru modal ", data)

  const getPlayers = async () => {
    const participants = await getStreakToChallenges(data.uid)
    if(participants){
      setPlayers([...participants])
    }
  }

  const addStreak = async () => {
    setIsLoading(true)
    await addStreakToChallenge( data.uid, user.user.uid, data.duration, data.completed, user.user.displayName )
    getPlayers()
    setIsAdded(true)
    setIsLoading(false)
  }

  const exitModal = () => {
    setIsAdded(false)
    onClose()
  }

  useEffect(() => {
    getPlayers()
    if(data.completed){
      console.log('challenge is completed')
    }
  }, [data])

  return (
      <>
        <Modal 
          isOpen={isOpen} 
          onClose={exitModal} 
          isCentered
          motionPreset='slideInBottom'
          size="sm"
          alignItems="center"
        >
          <ModalOverlay />
            <ModalContent
              textAlign="center"
            >
            <ModalHeader>Challenge - {data ? data.name : ''}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              width="100%"
            >
              <Flex
                flexDir="column"
                textAlign="center"
                minH="200px"
              >
                <Text
                  bg="brand.510"
                  p=".5rem"
                  rounded="10px"
                >{data ? data.task : ''}</Text>
                <Flex
                  justifyContent="space-around"
                  mt=".5rem"
                  fontWeight="500"
                >
                  <Text>Participants</Text>
                  <Text>Streaks</Text>
                </Flex>
                <Divider p=".5rem"/>
                {
                  players.length > 0 && players.map(
                    (player, i) => (
                      <Player 
                        data={player}
                        key={i}
                        i={i}
                        duration={data.duration}
                      />
                    )
                  )
                }
              </Flex>
              <Flex
                bg="brand.310"
                justifyContent="space-around"
                p="1rem"
                alignItems="center"
                rounded="10px"
              >
                <Text color="brand.200">Add Streak</Text>
                <IconButton
                  icon={isAdded ? <FiCheck /> : <FiPlus />}
                  onClick={addStreak}
                  isLoading={isLoading}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={exitModal}>
                Close
                </Button>
            </ModalFooter>
           </ModalContent>
        </Modal>
      </>
  )
}

export default ActiveChallengeModal