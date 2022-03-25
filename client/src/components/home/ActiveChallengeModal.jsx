import React, { useState, useEffect, useContext } from 'react'
import { Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Text, Divider, IconButton } from '@chakra-ui/react'
import { getStreakToChallenges, addStreakToChallenge, getUserStreakCount } from '../../firebase/challenge'
import Player from '../player/Player'
import { FiPlus, FiCheck } from "react-icons/fi";
import { UserContext } from '../providers/UsersProvider'
import * as dayjs from 'dayjs'

/**
 * Opens and displays the challenge details
 * Allows user to add a streak to their score
 * @param {*} data challenge data
 * @returns 
 */
const ActiveChallengeModal = ({isOpen, onClose, data }) => {
  const { user }  = useContext(UserContext)
  const { uid, streak, duration, completed, time } = data
  // challenge friends
  const [ players, setPlayers ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  // indicates if a streak has been incremented
  const [ isAdded, setIsAdded ] = useState(false)
  const [ ownStat, setOwnStat ] = useState(0)
  const [ timeRemaining, setTimeRemaining ] = useState('')

  //console.log("the data coming thru modal ", data)

  /**
   * Gets the number of streaks of all the participants to the challenge
   */
  const getPlayers = async () => {
    const participants = await getStreakToChallenges(uid)
    if(participants){
      setPlayers([...participants])
    }
  }

  /**
   * Gets the user's own streak count
   */
  const getOwnStat = async () => {
    let val = await getUserStreakCount( uid, user.uid );
    //console.log('the stat val', val)
    setOwnStat(val)
  }

  /**
   * Increments user's streak and updates the UI
   */
  const addStreak = async () => {
    setIsLoading(true)
    await addStreakToChallenge( uid, user.uid, streak, completed, user.displayName )
    getOwnStat()
    getPlayers()
    setIsAdded(true)
    setIsLoading(false)
  }

  const exitModal = () => {
    setIsAdded(false)
    onClose()
  }

  /**
   * Takes time string and calculates remaining time
   * Shows days if day is greater than 0, shows hours if hour is greater than 0, shows mins if time is remaining but days and hours is 0
   * @returns 
   */
  const calcTimeRemaining = () => {
    //console.log('time', time)
    const current =  dayjs().format('YYYY-MM-DDTHH:mm:ss')
    //const test = '2022-03-24T00:12:26'
    let mins = dayjs(current).diff(time,'m')
    //console.log("mins before calc", mins)
    let hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    mins = mins - (hours * 60);
    hours = hours - (days * 24);

    // console.log({current})
    // console.log({hours})
    // console.log({days})
    // console.log({mins})
    if (days < duration ){
      let day = duration - days
      if (day > 1){
        setTimeRemaining(`${day} days`)
        return
      }
      if (day === 1){
        setTimeRemaining(`${day} day`)
        return
      }
      if (hours > 1){
        setTimeRemaining(`${hours} hours`)
        return
      }
      if (hours === 1){
        setTimeRemaining(`${hours} hour`)
        return
      }
      if (mins > 1){
        setTimeRemaining(`${mins} mins`)
        return
      }
      if (mins === 1){
        setTimeRemaining(`${mins} min`)
        return
      }

    } else {
      setTimeRemaining('')
    }

  }

  useEffect(() => {
    getPlayers()
    getOwnStat()
    calcTimeRemaining()

  }, [])

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
            <ModalHeader> Challenge - {data ? data.name : ''} </ModalHeader>
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
                        duration={data.duration}
                      />
                    )
                  )
                }
              </Flex>
              { ownStat < data.duration ? (
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

              ) :
                <>
                <Text>Completed</Text>
                </>
              }
              <Flex
                justifyContent="center"
                bg="brand.130"
                rounded="10px"
                p=".5rem"
                mt="1rem"
              >
                <Text>
                  {data.winner ? "Winner: " : timeRemaining ? "Time Remaining: " : "Status: "}
                  {data.winner ? data.winner: timeRemaining ? `${timeRemaining}`: "Expired" }
                </Text>
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

export default React.memo(ActiveChallengeModal)