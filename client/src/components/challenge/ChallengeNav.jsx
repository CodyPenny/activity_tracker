import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ChallengeNav = ({back, next, handleSubmit}) => {
  const iconSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  return (
    <Box
    bg="brand.500"
    rounded="20px"
    >
        <Flex align="center" justify="center" justifyContent="space-evenly">
            <IconButton
                aria-label="Back"
                icon={<MdNavigateBefore />}
                as={Link}
                to={back}
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                aria-label="Forward"
                icon={<MdNavigateNext />}
                //as={Link}
                //to={next}
                variant="solid"
                bg="brand.500"
                size={iconSize}
                onClick={handleSubmit}
            />
        </Flex>

    </Box>
  )
}

export default ChallengeNav