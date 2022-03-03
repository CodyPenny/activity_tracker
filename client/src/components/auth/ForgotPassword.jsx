import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordWithEmail } from '../../firebase/auth'

// Chakra + Forms
import { useToast, Flex, Text, Button, Image, Grid, GridItem } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import ValidatorForm from '../formHelpers/ValidateForm.jsx';
import { emailValid } from '../../helpers/formValidators';

const ForgotPassword = () => {
  let navigate = useNavigate();
  const toast = useToast();

  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr 1fr'
    >
      <GridItem 
       pl="10%"
       pr="10%"
       pt="18%"
      >
        <Flex direction="column" align="center" justify="center">
          <Text textAlign="center" color="#747474" mb="3%">FORGOT PASSWORD</Text>
          <Image
            w="300px"
            src="https://mvp2020.s3-us-west-1.amazonaws.com/bluelock.png"
            ml="auto"
            mr="auto"
            mb="20%"
          />
        </Flex>
      </GridItem>
      <GridItem
        pl="10%" 
        pr="10%"
      >
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValid}
          onSubmit={async (data, { resetForm }) => {
            try {
              await resetPasswordWithEmail(data.email);
              resetForm();
              navigate('/reset_confirmation');
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: error,
                status: 'error',
                duration: 9001,
                isClosable: true
              });
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
                <ValidatorForm
                  placeholder="Enter Email Address"
                  name="email"
                  value={values.email}
                  type="input"
                />

                <Button
                  bg="#FFB6BA"
                  rounded="20px"
                  fontWeight="semibold"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                  color="white"
                  w="100%"
                  h="40px"
                  mt="15%"
                  color="#373737"
                  _hover={{ bg: '#FFB6BA' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  Reset Password
                </Button>

                <Button
                  as={Link}
                  to="/login"
                  align="center"
                  w="100%"
                  h="40px"
                  mt="10%"
                  bg="#F7EEC7"
                  rounded="20px"
                  mb="30%"
                >
                  Cancel
                </Button>
            
            </Form>
          )}
        </Formik>
      </GridItem>
 </Grid>
  );
};

export default ForgotPassword;
