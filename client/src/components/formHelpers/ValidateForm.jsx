import React from 'react';
import { useField, FastField } from 'formik';
import { Input, FormControl, FormErrorMessage, Box, useBreakpointValue } from '@chakra-ui/react';

/**
 * Validates and handles form change for Formik
 * @param {*} params
 * @returns 
 */
const ValidatorForm = ({ placeholder, type, callback = false, ...props }) => {
  const [ field, meta ] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : '';

  const inputSize = useBreakpointValue({ base: 'lg', sm: 'lg', md: 'xl' })

  return (
    <FastField name={field.name} validate={callback}>
      {({ form }) => {
        return (
          <FormControl
            width={'100%'}
            isInvalid={form.errors[field.name] && form.touched[field.name]}
            
          >
            <Box
              as={Input}
              variant={props.variant ? props.variant : "flushed"}
              placeholder={placeholder}
              type={type}
              {...field}
              isInvalid={!!errorText}
              bg={props.bg && props.bg}
              height={['2.5rem', '2.6rem']}
              fontSize={["md", "lg"]}
            />
              <FormErrorMessage
              fontSize={["md", "lg"]}
              >{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </FastField>
  );
};

export default ValidatorForm;