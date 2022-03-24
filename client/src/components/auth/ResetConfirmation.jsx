import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";

import { Box, Flex, Text, Button, Icon, Grid, GridItem } from '@chakra-ui/react';

const ResetConfirmation = () => {
  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr 1fr'
    >
      <GridItem 
        pl="10%"
        pr="10%"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        gap="10%"
      >
          <FiCheckCircle size="10%"/>

        <Text 
        textAlign="center" 
        color="#5D5D5D"
        fontSize={["lg", "2xl"]}
        >
          Check your email
        </Text>

        <Text 
         textAlign="center"
         color="#5D5D5D"
         fontSize={["lg", "2xl"]}
         >
          Reset password link sent.
        </Text>
      </GridItem>
      <GridItem 
        pl="10%"
        pr="10%"
      >
        <Link to="/login">
          <Button
            bg="#FFB6BA"
            rounded="20px"
            fontWeight="semibold"
            w="100%"
            //h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
            fontSize={["md", "xl"]}
            height={['2.5rem', '3rem']}
          >
            Log In
          </Button>
        </Link>
        <Box pb="10%"></Box>
        <Link to="/">
          <Button
            bg="#FFB6BA"
            rounded="20px"
            fontWeight="semibold"
            //color="white"
            w="100%"
            //h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
            fontSize={["md", "xl"]}
            height={['2.5rem', '3rem']}
          >
            Cancel
          </Button>
        </Link>
        <Box mb="35%"></Box>
    </GridItem>
    </Grid>
  );
};

export default ResetConfirmation;
