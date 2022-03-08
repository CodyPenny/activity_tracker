import React from 'react'
import { Flex, HStack, Button, Box, Input, FormErrorMessage, Textarea, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import ValidatorForm from '../formHelpers/ValidateForm';
import { challengeValid } from '../../helpers/formValidators';


const ChallangeForm = ({}) => {

  return (
    <Flex
        flexDirection="column"
    >
        <Formik
            initialValues={{ name: '', task: '', streak: 1, duration: '' }}
            validationSchema={challengeValid}
            onSubmit= { (data, { resetForm }) => {
                console.log('submitting challenge', data)
            }}
        >
            {({ values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
                <Box
                  borderRadius='lg'
                  background="brand.500"
                >
                    <Input
                        placeholder='Challenge Name'
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
                        aria-label='slider'
                        min={1}
                        max={12}
                        step={1}
                        colorScheme="brand.400"
                    >
                        <SliderTrack>
                         <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb fontSize='sm' boxSize='32px' children={values.streak} />
                    </Slider>
   
                </Box>
                <HStack>
                    <Button
                      as={Link}
                      to="/home"
                      background="brand.300"
                      variant="solid"
                      rounded="20px"
                    >
                        Cancel
                    </Button>
                    <Button
                      background="brand.300"
                      variant="solid"
                      rounded="20px"
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                        Submit
                    </Button>
                </HStack>
            </Form>
            )}

        </Formik>

    </Flex>
  )
}

export default ChallangeForm