import React, { useContext } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { Flex, Spinner } from '@chakra-ui/react'
import StatHelper from './StatHelper'

const Stats = () => {
  const { user, friends } = useContext(UserContext);

  return (
    <>
    { user ? (
      <Flex
          justifyContent="space-between"
          fontSize={['sm', 'md']}
          fontWeight="500"
      >
          {[
            { name: "Completed", val: user.completed }, 
            { name: "Wins", val: user.wins }, 
            { name: "Friends", val: friends.length }
          ].map( (stat, i) => (
                  <StatHelper
                      stat={stat}
                      key={i}
                  />
              ))}
      </Flex> ) : (
        <>
         <Spinner size='lg' />
        </>
      )
    }
  </>
  )
}

export default Stats