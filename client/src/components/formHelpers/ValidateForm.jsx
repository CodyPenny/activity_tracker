import React from 'react';
import { useField, Field } from 'formik';
import { Input, FormControl, FormErrorMessage, Box } from '@chakra-ui/react';

const ValidatorForm = ({ placeholder, type, callback = false, ...props }) => {
  const [ field, meta ] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Field name={field.name} validate={callback}>
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
            />
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ValidatorForm;