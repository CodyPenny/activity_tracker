import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UsersProvider.jsx';
import { Formik, Form,  } from 'formik';
import { validateSearchFriend } from '../../helpers/formValidators';
import { Grid, GridItem, Button, useToast } from '@chakra-ui/react';
import ValidateForm from '../formHelpers/ValidateForm.jsx';
import SearchFriendList from './SearchFriendList';
import NavButton from '../home/NavButton';
import { getDefaultFriends, searchMatchingFriends } from '../../firebase/friend';
import { useNavigate } from 'react-router-dom';

const SearchFriends = () => {
    const [ friendResults, setFriendResults ] = useState([])
    const { user } = useContext(UserContext);
    let navigate = useNavigate();
    const toast = useToast();

    const getFriends = async () => {
        let defaults = await getDefaultFriends( user.uid )
        setFriendResults([...defaults])
    }

    useEffect( () => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken && user) {
            navigate('/searchFriends')
            getFriends()
        }
        if (!authToken) {
            navigate('/login')
        }
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
                            const results = await searchMatchingFriends( data.searchText.toUpperCase(), user.uid);
                            console.log('matching friends', results)
                            setFriendResults([...results])
                            resetForm();
                            } catch (error) {
                            //console.log('err', error)
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
                                placeholder="Search Friends By Name"
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
                <SearchFriendList 
                friends={friendResults}
                isSubmitting={isSubmitting}
                />
            </GridItem>
            <GridItem>
                <NavButton />
            </GridItem>
        
        </Grid>
    )
}

export default SearchFriends;