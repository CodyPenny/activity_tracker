import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { MdPlaylistAdd, MdLogout, MdEdit, MdGroup, MdGroupAdd, MdHomeFilled } from 'react-icons/md';
import { signOutOfApp } from '../../firebase/auth';

const NavButton = () => {
  const iconSize = useBreakpointValue({ base: 'md', sm: 'lg' })

  const sign_out = () => {
    signOutOfApp()
    navigate('/')
  }

  return (
    <Box
    bg="brand.500"
    rounded="20px"
  >
        <Flex align="center" justify="center" justifyContent="space-evenly">
            <IconButton
                aria-label="Edit"
                icon={<MdHomeFilled />}
                as={Link}
                to="/home"
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                aria-label="Edit"
                icon={<MdEdit />}
                as={Link}
                to="/editProfile"
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                icon={<MdGroup />}
                as={Link}
                to="/friends"
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                icon={<MdGroupAdd />}
                as={Link}
                to="/searchFriends"
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                icon={<MdPlaylistAdd />}
                as={Link}
                to="/challenge/create"
                variant="solid"
                bg="brand.500"
                size={iconSize}
            />
            <IconButton
                aria-label="sign out"
                icon={<MdLogout />}
                variant="solid"
                onClick={sign_out}
                bg="brand.500"
                size={iconSize}
            />
        </Flex>
  </Box>
  )
}

export default NavButton