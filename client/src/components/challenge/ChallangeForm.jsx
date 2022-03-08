import React, { useContext } from 'react'
import { UserContext } from '../providers/UsersProvider.jsx';
import { Flex, HStack, Button, Box, Input, Textarea, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { challengeValid } from '../../helpers/formValidators';
import { createChallenge } from '../../firebase/challenge';


const ChallangeForm = ({}) => {
  const user = useContext(UserContext);
  let navigate = useNavigate();

  return (
    <>
    <Formik
        initialValues={{ name: '', task: '', streak: 1, duration: 7 }}
        validationSchema={challengeValid}
        onSubmit= { async ( data, { resetForm }) => {
            console.log('submitting challenge', data)
            // save to database
            // go to add friends to challenge section
            // pass down challenge uid to next page
            try {
                const cuid = await createChallenge( data, user.user.uid )
                console.log('ret cuid', cuid)
                navigate('/addFriendsChallenge')
            } catch (error) {
                
            }
        }}
    >
        {({ values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue }) => (
            <Form 
            onSubmit={handleSubmit}
            >
                <Flex
                    fontSize={['sm', 'lg']}
                    flexDirection="column"
                    gap="2.5rem"
                >
                    <Box
                    borderRadius='lg'
                    background="brand.500"
                    >
                        <Input
                            placeholder='Challenge Name'
                            fontSize={['sm', 'lg']}
                            name="name"
                            errorBorderColor='crimson'
                            isInvalid={errors.name ? true : false}
                            value={values.name}
                            onChange={handleChange}
                        />
                    </Box>
                        {errors.name && touched.name && errors.name}
                    <Box
                    borderRadius='lg'
                    background="brand.500"
                    >
                        <Textarea
                            placeholder="Enter the challenge to be completed!"
                            name="task"
                            fontSize={['sm', 'lg']}
                            errorBorderColor='crimson'
                            isInvalid={errors.task ? true : false}
                            value={values.task}
                            onChange={handleChange}
                        />
                    </Box>
                        {errors.task && touched.task && errors.task}
                    <Box
                        borderRadius='lg'
                        background="brand.500"
                        p={["0.5rem", "1rem"]}
                    >
                        <Text>How many times should participants check in their challenge progress throughout the day?</Text>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            name="streak"
                            value={values.streak}
                            onChange={(value) => {
                                setFieldValue('streak', value)
                            }}
                            aria-label='check-in-slider'
                            min={1}
                            max={12}
                            step={1}
                        >
                            <SliderTrack >
                            <SliderFilledTrack bg="brand.300"/>
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize={['24px','32px']} children={values.streak} />
                        </Slider>
    
                    </Box>
                    <HStack
                        borderRadius='lg'
                        background="brand.500"
                        p={["0.5rem", "1rem"]}
                    >
                        <Text>How many days should the challenge last?</Text>
                        <NumberInput 
                            size='md' 
                            maxW={24} 
                            min={1}
                            max={31}
                            name="duration"
                            fontSize={['sm', 'lg']}
                            value={values.duration}
                            onChange={(value) => {
                                setFieldValue('duration', value)
                            }}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                    >
                        <Button
                            as={Link}
                            to="/home"
                            background="brand.300"
                            variant="solid"
                            rounded="20px"
                            width="40%"
                            fontSize={['sm', 'lg']}
                        >
                            Cancel
                        </Button>
                        <Button
                            background="brand.300"
                            variant="solid"
                            rounded="20px"
                            width="40%"
                            fontSize={['sm', 'lg']}
                            isDisabled={isSubmitting}
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </HStack>
                </Flex>
            </Form>
        )}
    </Formik>
     </>
  )
}

export default ChallangeForm