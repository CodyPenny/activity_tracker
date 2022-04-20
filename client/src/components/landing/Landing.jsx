import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Grid, GridItem, Heading, Text, IconButton, Image } from '@chakra-ui/react';
import { FiArrowRight } from "react-icons/fi";
import art from '../../../static/streak2.jpg'

const Landing = () => {

  return (
    <Grid
    h='100%'
    bg="#fb436b"
    templateRows='1fr 1fr'
    >
     <GridItem
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
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
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="8%"
     >
        <Heading 
        fontSize={["5xl", "6xl"]} 
        letterSpacing=".2rem"
        fontFamily="Fredoka One"
        color="#34fbcb"
        >
            STREAK
        </Heading>
        <Text 
          fontSize={["xl", "2xl"]} 
          fontFamily="Fredoka One"
          color="#b5f0c7"
        >CHALLENGE YOUR FRIENDS
        </Text>
            <IconButton
                fontSize={["2rem", "3rem"]} 
                icon={<FiArrowRight color="#24201e"/>}
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