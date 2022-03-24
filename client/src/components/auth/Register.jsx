import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { Button, useToast, Box, Image, Grid, GridItem } from '@chakra-ui/react';
import { registerValid } from '../../helpers/formValidators';

// Components
import ValidateForm from '../formHelpers/ValidateForm.jsx';
import { registerWithEmailAndPassword } from '../../firebase/auth';
import { createUserProfileDocument } from '../../firebase/user.js';

const Register = () => {
  const toast = useToast();
  let navigate = useNavigate();

  /**
   * clean up or unmount error
   */
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Grid
    h='100%'
    bg="brand.100"
    templateRows='1fr 2fr'
    >
      <GridItem 
        pl="10%"
        pr="10%"
        pt="15%"
      >
        <Box
          borderRadius="lg"
          overflow='hidden'
          bg="#bbebeb"
          display="flex"
          //alignItems="center"
          justifyContent="center"
          width="100%"
        >

        <Image
          //rounded="full"
          //width="220px"
          width="75%"
          //marginLeft={["auto","30%"]}
          //marginBottom="10%"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/blueemail2.png"
        />
        </Box>
      </GridItem>
      <GridItem
        pl="10%"
        pr="10%"
        mt="8%"
      >
        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          validationSchema={registerValid}
          onSubmit={ async ( data, { resetForm }) => {
            try {
              const user = await registerWithEmailAndPassword(
                data.email,
                data.password,
               );
              user.displayName = data.displayName
              // create the user in the db
              await createUserProfileDocument( user );
              resetForm();
              navigate('/home')
            } catch (error) {
              console.log('error in form', error)
              toast({
                title: 'An error occurred.',
                description: 'Email already in use.',
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

              <Box paddingTop="5%">
                <ValidateForm
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  type="password"
                />
              </Box>
              <Box paddingTop="5%">
                <ValidateForm
                  placeholder="Full Name"
                  name="displayName"
                  value={values.displayName}
                  type="input"
                />
              </Box>

              <Button
                background="#FFB6BA"
                variant="solid"
                rounded="20px"
                width="100%"
                //height="40px"
                marginTop="18%"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                fontSize={["md", "xl"]}
                height={['2.5rem', '3rem']}
              >
                Register
              </Button>

              <Button
                as={Link}
                to="/"
                background="#F7EEC7"
                variant="solid"
                rounded="20px"
                width="100%"
                //height="40px"
                marginTop="10%"
                fontSize={["md", "xl"]}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                height={['2.5rem', '3rem']}
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

export default Register;