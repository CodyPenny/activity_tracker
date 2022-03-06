import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail } from '../../firebase/auth';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { useToast, Box, Flex, Button, Image, Grid, GridItem } from '@chakra-ui/react';

// Components
import { validateEmailPasswordFormat } from '../../helpers/formValidators';
import ValidateForm from '../formHelpers/ValidateForm.jsx';

const Login = () => {
  const toast = useToast();
  let navigate = useNavigate();

  return (
    <Grid
      h='100%'
      bg="brand.100"
      templateRows='2fr 2fr 1fr'
    >
     <GridItem>
        <Image
          rounded="full"
          size="150px"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/enter.png"
          ml="auto"
          mr="auto"
          mt="12%"
        />
    </GridItem>
    <GridItem>
      <Box pl="10%" pr="10%" pt="8%">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validateEmailPasswordFormat}
          onSubmit={async (data, { resetForm }) => {
            try {
              await signInWithEmail(data.email, data.password);
              resetForm();
              navigate('/home')
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
              <ValidateForm
                placeholder="Email Address"
                name="email"
                value={values.email}
                type="input"
              />
              <Box mb="5%"></Box>
              <ValidateForm
                placeholder="Password"
                name="password"
                value={values.password}
                type="password"
              />

              <Button
                bg="brand.300"
                rounded="20px"
                fontWeight="semibold"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                color="white"
                w="100%"
                h="40px"
                mt="10%"
                color="#373737"
                _hover={{ bg: '#FFB6BA' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Sign In
              </Button>

              <Button
                bg="brand.400"
                mt="10%"
                rounded="20px"
                fontWeight="semibold"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={signInWithGoogle}
                color="white"
                w="100%"
                h="40px"
                mb="10%"
                color="#373737"
                _hover={{ bg: '#FF5454' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Google OAuth
              </Button>
              </Form>
          )}
        </Formik>
      </Box>
    </GridItem>
    <GridItem>
        <Flex align="center" pl="10%" pr="10%" justifyContent="space-between">
          <Link to="/reset" style={{ textDecoration: 'none' }}>
            <Button
              bg="#F7EEC7"
              pt="10px"
              pb="10px"
              rounded="20px"
              fontWeight="semibold"
              color="white"
              w="100%"
              h="40px"
              color="#747474"
              _hover={{ bg: '#FF5454' }}
              _focus={{ boxShadow: 'outline' }}
            >
              Forgot Password
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              bg="#F7EEC7"
              pt="10px"
              pb="10px"
              rounded="15px"
              fontWeight="semibold"
              color="white"
              w="100%"
              h="40px"
              color="#747474"
              _hover={{ bg: '#FF5454' }}
              _focus={{ boxShadow: 'outline' }}
            >
              Cancel
            </Button>
          </Link>
        </Flex>
      </GridItem>
     
   
    </Grid>
  );
};

export default Login;
