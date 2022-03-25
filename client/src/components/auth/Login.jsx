import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail } from '../../firebase/auth';

import { Formik, Form } from 'formik';
import { useToast, Box, Flex, Button, Image, Grid, GridItem, Text, IconButton, Heading } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import { validateEmailPasswordFormat } from '../../helpers/formValidators';
import ValidateForm from '../formHelpers/ValidateForm.jsx';
import { BarDivider } from '../styles/appStyles';

const Login = () => {
  const toast = useToast();
  let navigate = useNavigate();

  return (
    <Grid
      h='100%'
      bg="brand.100"
      templateRows='1fr 2fr 1fr'
    >
     <GridItem
        ml="auto"
        mr="auto"
        display="flex"
        flexDir="column"
        textAlign="center"
        justifyContent="center"
     >  <Box>
          <Heading 
          fontSize={["3xl","4xl"]}
          >
            Hello!
          </Heading>
          <Text 
          pt=".5rem" 
          fontSize={["xl","2xl"]}
          >
            Let's Play.
          </Text>
         </Box>
    </GridItem>
    <GridItem>
      <Box 
        pl="10%" 
        pr="10%" 
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validateEmailPasswordFormat}
          onSubmit={async (data, { resetForm }) => {
            try {
              const res = await signInWithEmail(data.email, data.password);
              // if invalid, throws error in catch
              console.log('res from signing in', res)
              resetForm();
              if(res.user.accessToken){
                console.log("navigating to home")
                navigate('/home')
                return
              }
              else {
                console.log('not sign in')
              }
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: 'Invalid email or password.',
                status: 'error',
                duration: 9001,
                isClosable: true
              });
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
            <Flex
              flexDir="column"
              gap={["0", ".5rem"]}
              mt="1rem"
            >
              <ValidateForm
                placeholder="Email Address"
                name="email"
                value={values.email}
                type="input"
                variant="outline"
                bg="brand.200"
                
                size="lg"
              />
              <Box mb="5%"></Box>
              <ValidateForm
                placeholder="Password"
                name="password"
                value={values.password}
                type="password"
                variant="outline"
                bg="brand.200"
                size="lg"
              />
              <Flex 
                justifyContent="right" 
                mt="5%"
                fontSize={["sm", "lg"]}
              >
                <Link to="/reset" 
                style={{
                  color: "#36454F"
                  }}>Forgot Password
                </Link>
              </Flex>
              <Button
                bg="brand.300"
                rounded="10px"
                fontWeight="semibold"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                color="white"
                w="100%"
                //h="40px"
                mt="8%"
                //size="lg"
                fontSize={["md", "xl"]}
                height={['2.5rem', '3rem']}
                //color="#373737"
                _hover={{ bg: 'brand.500', color: "brand.120" }}
                _focus={{ boxShadow: 'outline' }}
              >
                Sign In
              </Button>
              <Flex 
              justifyContent="space-evenly" alignItems="center" 
              mt="2rem"
              >
                <BarDivider />
                <Text 
                color="brand.120"
                fontSize={["sm", "lg"]}
                >Or continue with</Text>
                <BarDivider />
              </Flex>
              <IconButton
                bg="transparent"
                mt="2rem"
                rounded="10px"
                fontWeight="semibold"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={signInWithGoogle}
                color="white"
                w="100%"
                mb="10%"
                p={["1.3","1.5rem"]}
                fontSize={["1.5rem", "2rem"]}
                border="2px solid white"
                icon={<FcGoogle />}
                _hover={{ bg: 'brand.500' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Google OAuth
              </IconButton>
              </Flex>
              </Form>
          )}
        </Formik>
      </Box>

    </GridItem>

    <GridItem>
      <Flex 
      justifyContent="center"
      fontSize={["sm", "lg"]}
      >
        <Text 
        fontWeight="500">
          First time? 
          <Link to="/register" 
          style={{
            color: "#3D56B2"
            }}> Sign Up
          </Link>
        </Text>
      </Flex>
       
      </GridItem>
     
   
    </Grid>
  );
};

export default React.memo(Login);
