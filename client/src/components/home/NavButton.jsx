import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { MdHomeFilled, MdEdit, MdGroup, MdPersonSearch, MdLogout } from 'react-icons/md';
import { signOutOfApp } from '../../firebase/auth';

/**
 * Nav buttons on bottom of screen
 */
const NavButton = () => {
  let navigate = useNavigate()
  const iconSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  const sign_out = () => {
    signOutOfApp()
    navigate('/')
  }

  return (
    <Box
    bg="brand.510"
    rounded="20px"
  >
        <Flex align="center" justify="center" justifyContent="space-evenly">
            <IconButton
                aria-label="Edit"
                icon={<MdHomeFilled />}
                as={Link}
                to="/home"
                variant="solid"
                bg="brand.510"
                size={iconSize}
            />
            <IconButton
                aria-label="Edit"
                icon={<MdEdit />}
                as={Link}
                to="/buildChallenge"
                variant="solid"
                bg="brand.510"
                size={iconSize}
            />
            <IconButton
                icon={<MdGroup />}
                as={Link}
                to="/friends"
                variant="solid"
                bg="brand.510"
                size={iconSize}
            />
            <IconButton
                icon={<MdPersonSearch />}
                as={Link}
                to="/searchFriends"
                variant="solid"
                bg="brand.510"
                size={iconSize}
            />
            <IconButton
                aria-label="sign out"
                icon={<MdLogout />}
                variant="solid"
                onClick={sign_out}
                bg="brand.510"
                size={iconSize}
            />
        </Flex>
  </Box>
  )
}

export default NavButton