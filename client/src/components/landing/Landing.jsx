import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Grid, GridItem, Heading, Flex, Text, IconButton } from '@chakra-ui/react';
import { FiArrowRight } from "react-icons/fi";

const Landing = () => {

  return (
    // <Box
    //     top="0"
    //     bg="brand.100"
    //     pos="relative"
    //     height="100%"
    //  >
    //      <Box 
    //     boxSize="sm" 
    //     background="#FFFFFF"
    //     />
    //         <Box
    //         w="100%"
    //         pos="absolute"
    //         bottom="0"
    //         textAlign="center"
    //         mb="5%"
    //         >
    //          <Link to="/login" style={{ width: '80%' }}>
    //              <Box
    //              as={Button}
    //              rounded="20px"
    //              background="brand.300"
    //              color="#373737"
    //              width="90%"
    //              height="40px"
    //              marginTop="5%"
    //              marginBottom="10%"
    //              fontWeight="semibold"
    //              textAlign="center"
    //              _hover={{ bg: '#FFB6BA' }}
    //              _focus={{ boxShadow: 'outline' }}
    //              >
    //                  Log In
    //              </Box>
    //          </Link>
    //          <Link to="/register" style={{ width: '80%' }}>
    //              <Box
    //              as={Button}
    //              background="brand.300"
    //              color="#373737"
    //              rounded="20px"
    //              width="90%"
    //              height="40px"
    //              marginBottom="10%"
    //              fontWeight="semibold"
    //              _hover={{ bg: '#FFB6BA' }}
    //              _focus={{ boxShadow: 'outline' }}
    //              >
    //              Register
    //              </Box>
    //          </Link>
    //      </Box>
    // </Box>
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='2fr 1fr'
    >
     <GridItem
      ml="auto"
      mr="auto"
     >
         <Box
          borderRadius="lg"
          bg="brand.310"
          height="90%"
          width="300px"
         >

         </Box>
    </GridItem>

     <GridItem
      ml="auto"
      mr="auto"
     >
         <Flex 
            flexDir="column"
         >
            <Heading>Streak</Heading>
            <Text>Challenge your friends</Text>
            <Link to="/login">
                <IconButton
                fontSize="2rem"
                icon={<FiArrowRight />}
                >
                </IconButton>
            </Link>
         </Flex>
    </GridItem>

    </Grid>
  )
}

export default Landing;