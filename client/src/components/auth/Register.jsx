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
    templateRows='1fr 3fr'
    >
      <GridItem 
        pl="10%"
        pr="10%"
        pt="15%"
      >
        <Image
          rounded="full"
          width="220px"
          marginLeft={["auto","30%"]}
          marginBottom="10%"
          src="https://mvp2020.s3-us-west-1.amazonaws.com/blueemail2.png"
        />
      </GridItem>
      <GridItem
        pl="10%"
        pr="10%"
      >
        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          validationSchema={registerValid}
          onSubmit={async (data, { resetForm }) => {
            try {
              const user = await registerWithEmailAndPassword(
                data.email,
                data.password,
               );
              user.displayName = data.displayName
              await createUserProfileDocument( user );
              resetForm();
              navigate('/profile')
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

              <Box paddingTop="10%">
                <ValidateForm
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  type="password"
                />
              </Box>

              <Box paddingTop="10%">
                <ValidateForm
                  placeholder="Display Name"
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
                height="40px"
                marginTop="18%"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
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
                height="40px"
                marginTop="10%"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
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