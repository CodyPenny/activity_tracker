import styled from 'styled-components';
import { IconButton } from '@chakra-ui/react';

export const StyledIconButton = styled(IconButton)`
  :focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    outline: 0 !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }
`;

