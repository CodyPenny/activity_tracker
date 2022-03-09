import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { Flex } from '@chakra-ui/react'
import StatHelper from './StatHelper'

const Stats = () => {
  const user = useContext(UserContext);
  const [ userStats, setUserStats ] = useState([])

  const getStats = () => {
    setUserStats([
        {name: "Completed", val: user.user.completed}, 
        {name: "Wins", val: user.user.wins}, 
        {name: "Friends", val: user.friends.length}
    ])
  }

  useEffect(() => {
      if (user) {
        getStats()
      }

  }, [])

  return (
    <Flex
        justifyContent="space-between"
        fontSize={['sm', 'lg']}
        fontWeight="500"
    >
        {userStats.map( (stat, i) => (
            <StatHelper
                stat={stat}
                key={i}
            />
        ))}
    </Flex>
  )
}

export default Stats