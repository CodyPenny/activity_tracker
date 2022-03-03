import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

// Components
import App from './components/App.jsx';

// Contexts
import UsersProvider from './providers/UsersProvider.jsx';

ReactDOM.render(
  <ChakraProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
