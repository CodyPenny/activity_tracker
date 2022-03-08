import React from 'react'
import { Flex, HStack, Button, Box, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'
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
            initialValues={{ name: '', task: '', streak: '', duration: '' }}
            // validate={values => {
            //     const errors = {};
            //     if (!values.name) {
            //       errors.name = 'The challenge name is required';
            //     } 
            //     if (!values.task) {
            //       errors.task = 'The challenge task is required';
            //     } 

            //     return errors;
            //   }}
            validationSchema={challengeValid}
            onSubmit= { (data, { resetForm }) => {
                console.log('submitting challenge', data)
            }}
        >
            {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
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