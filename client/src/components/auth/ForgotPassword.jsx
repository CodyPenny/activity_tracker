import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordWithEmail } from '../../firebase/auth'

// Chakra + Forms
import { useToast, Flex, Text, Button, Image, Grid, GridItem, Box } from '@chakra-ui/react';
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
       pt="10%"
       ml="auto"
       mr="auto"
       width="100%"
       display="flex"
       justifyContent="center"
       flexDir="column"
       alignItems="center"
      >
          <Text 
            textAlign="center" 
            color="#747474" 
            mb="3%"
            fontSize={["md", "xl"]}
          >FORGOT PASSWORD</Text>
          <Box
            borderRadius="lg"
            overflow='hidden'
            width={["100%", "80%"]}
          >
            <Image
              w="100%"
              src="https://mvp2020.s3-us-west-1.amazonaws.com/bluelock.png"
              mb="20%"
            />
          </Box>
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
              <Flex
                flexDir="column"
              >
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
                  w="100%"
                  height={['2.5rem', '3rem']}
                  mt="15%"
                  color="#373737"
                  fontSize={["md", "xl"]}
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
                  height={['2.5rem', '3rem']}
                  mt="15%"
                  bg="#F7EEC7"
                  rounded="20px"
                  mb="30%"
                  fontSize={["md", "xl"]}
                >
                  Cancel
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </GridItem>
 </Grid>
  );
};

export default ForgotPassword;
