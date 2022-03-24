import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Grid, GridItem, Heading, Flex, Text, IconButton, Image } from '@chakra-ui/react';
import { FiArrowRight } from "react-icons/fi";
import art from '../../../static/streak2.jpg'

const Landing = () => {

  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr 1fr'
    >
     <GridItem
      // ml="auto"
      // mr="auto"
      // pl="10%"
      // pr="10%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      //pt="8%"
     >
         <Box
           borderRadius="lg"
           overflow='hidden'
           bg="#fff"
           display="flex"
           alignItems="center"
           justifyContent="center"
           width="80%"
           height="80%"
         >
            <Image 
            src={art} 
            alt="Image of characters" 
            width="100%"
            />
         </Box>
    </GridItem>

    <GridItem
      // ml="auto"
      // mr="auto"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="8%"
      //justifyContent="center"
      // textAlign="center"
      // mt={["10%", "5%"]}
     >
        <Heading 
        fontSize={["5xl", "6xl"]} 
        letterSpacing=".2rem"
        >
            Streak
        </Heading>
        <Text 
            fontSize={["3xl", "4xl"]} 
           // mt="8%"
        >Challenge your friends
        </Text>
            <IconButton
                fontSize={["2rem", "3rem"]} 
                icon={<FiArrowRight />}
                mt="5%"
                width="75%"
                bg="brand.310"
                as={Link}
                to="/login"
                p={["1.5rem","2rem"]}
                rounded="20px"
            >
            </IconButton>
    </GridItem>
    </Grid>
  )
}

export default Landing;