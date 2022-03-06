import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, useField, Field  } from 'formik';
import { validateSearchFriend } from '../../helpers/formValidators';
import { Grid, GridItem, Stack, Box, Button, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import ValidateForm from '../formHelpers/ValidateForm.jsx';
import SearchFriendList from '../friends/SearchFriendList';
import NavButton from '../home/NavButton';
import { getUser } from '../../firebase/user';

const SearchFriends = () => {
    const [ friendResults, setFriendResults ] = useState([])

    const getFriends = async () => {
        let defaultFriend = await getUser('S9yP99wNPVlTHGF25na5')
        console.log('def ', defaultFriend)
        setFriendResults([...friendResults, defaultFriend])
    }

    useEffect( () => {
        getFriends()
    }, [])

    return (
        <Grid
        h='100%'
        bg="brand.100"
        templateRows='1fr 5fr 1fr'
        pr="10%" 
        pl="10%" 
        >
            <GridItem
                pt="8%"
            >
                    <Formik
                        initialValues={{ searchText: '' }}
                        validationSchema={validateSearchFriend}
                        onSubmit={async (data, { resetForm }) => {
                            try {
                            console.log('test', data.searchText)
                            //await signInWithEmail(data.email, data.password);
                            resetForm();
                        // update results
                            } catch (error) {
                            toast({
                                title: 'An error occurred.',
                                description: 'No results.',
                                status: 'error',
                                duration: 9001,
                                isClosable: true
                            });
                            }
                    }}
                    >
                    {({ values, isSubmitting }) => (
                        <Form 
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: ".5rem"
                            }}>
                            <ValidateForm
                                placeholder="Search Friends"
                                name="searchText"
                                value={values.searchText}
                                type="input"
                                variant="outline"
                                bg="#fff"
                            />
                            <Button
                                bg="brand.300"
                                rounded="10px"
                                fontWeight="semibold"
                                isDisabled={isSubmitting}
                                isLoading={isSubmitting}
                                type="submit"
                                color="white"
                                // w="100%"
                                h="40px"
                                mt="10%"
                                color="#373737"
                                _hover={{ bg: '#FFB6BA' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                    </Formik>
            </GridItem>
            <GridItem
                pt="3rem"
            >
                <SearchFriendList friends={friendResults}/>
            </GridItem>
            <GridItem>
                <NavButton />
            </GridItem>
        
        </Grid>
    )
}

export default SearchFriends;