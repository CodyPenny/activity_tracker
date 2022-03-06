import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UsersProvider.jsx';

// Chakra + Forms
import { Formik, Form } from 'formik';
import { useToast,  Box,  Flex, Text, Button, Grid, GridItem, } from '@chakra-ui/react';
import ValidatorForm from '../formHelpers/ValidateForm.jsx';
import UploadFile from './UploadFile.jsx';
import NavButton from '../home/NavButton.jsx';

const EditProfile = () => {
    const user = useContext(UserContext);
    const toast = useToast();
  
    return (
        <Grid
        h='100%'
        bg="brand.100"
        templateRows='1fr 2fr 3fr 1fr'
        pl="10%"
        pr="10%"
        >
            <GridItem 
                ml="auto"
                mr="auto"
            >
                <Text 
                    textAlign="center" 
                    fontSize="lg" 
                    color="#464646"
                    mt="50%"
                >
                EDIT PROFILE
                </Text>
            </GridItem>
            <GridItem>
                <Box align="center"
                >
                <UploadFile />
                </Box>
                <Text
                    mt="3%"
                    fontSize="sm"
                    color="#2E2E2E"
                    position="relative"
                    mt="10%"
                    fontWeight="semibold"
                >
                    {/* {user.email} */}
                </Text>
            </GridItem>

            <GridItem>
                    <Formik
                        initialValues={{ displayName: '' }}
                    //validationSchema={displayNameValid}
                        onSubmit={async (data, { resetForm }) => {
                        // try {
                        //   await editProfile(user.uid, data);
                        //   toast({
                        //     title: 'Display name changed!',
                        //     description: `${data.displayName} is now your display name.`,
                        //     status: 'success',
                        //     duration: 2000,
                        //     isClosable: true
                        //   });
                        //   resetForm();
                        // } catch (error) {
                        //   toast({
                        //     title: 'An error occurred.',
                        //     description: error,
                        //     status: 'error',
                        //     duration: 5000,
                        //     isClosable: true
                        //   });
                        // } finally {
                        //   return null;
                        // }
                        }}
                    >
                        {({ values, isSubmitting }) => (
                            <Flex
                            as={Form}
                            direction="column"
                            gap="1.5rem"
                            >
                          
                                <Text fontSize="sm" textAlign="left" >
                                    Display Name
                                </Text>
                                <ValidatorForm
                                    placeholder=" Enter new display name"
                                    name="displayName"
                                    value={values.displayName}
                                    type="input"
                                    bg="#fff"
                                /> 
                    
                                <Button
                                    bg="#FFB6BA"
                                    rounded="20px"
                                    fontWeight="semibold"
                                    w="100%"
                                    h="40px"
                                    isDisabled={isSubmitting}
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                    <Button
                        as={Link}
                        to="/home"
                        align="center"
                        bg="#F7EEC7"
                        w="100%"
                        h="40px"
                        bg="#F7EEC7"
                        rounded="20px"
                    >
                    Cancel
                    </Button>
            
                    <Button
                        bg="#FF5454"
                        rounded="20px"
                        variant="solid"
                        w="100%"
                        color="white"
                        onClick={() => {
                            toast({
                            title: 'No leaving.',
                            description: '​👹​👺​👻​',
                            status: 'error',
                            duration: 9001,
                            isClosable: true
                            });
                        }}
                    >
                    Delete Account
                    </Button>

                    </Flex>
                        )}
                </Formik>
             
            </GridItem>
            <GridItem>
                <NavButton />
            </GridItem>
      </Grid>
    );
  };
  
  export default EditProfile;
  