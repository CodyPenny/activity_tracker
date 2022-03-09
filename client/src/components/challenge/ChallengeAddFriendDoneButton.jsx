import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, IconButton, useBreakpointValue, Button } from '@chakra-ui/react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ChallengeAddFriendDoneButton = ({back, next, handleSubmit}) => {
  const iconSize = useBreakpointValue({ base: 'md', sm: 'lg' })


  return (
    <Button
      bg="brand.500"
      rounded="20px"
      variant="solid"
      width="100%"
      height="40px"
      fontSize={['sm', 'lg']}
      as={Link}
      to="/home"
    >
        {/* <Flex align="center" justify="center" justifyContent="space-evenly">
            {/* <IconButton
                aria-label="Back"
                icon={<MdNavigateBefore />}
               
                variant="solid"
                bg="brand.500"
         
            /> */}
            {/* <IconButton
                aria-label="Forward"
                icon={<MdNavigateNext />}
                //as={Link}
                //to={next}
                variant="solid"
                bg="brand.500"

            />
        </Flex> */} 
      Done
    </Button>
  )
}

export default ChallengeAddFriendDoneButton