import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"

// Components
import App from './components/App.jsx'

// Contexts
import UsersProvider from './components/providers/UsersProvider.jsx';
import FriendProvider from './components/providers/FriendProvider.jsx';

// custom values
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.400',
      }
    }
  },
  colors: {
    brand: {
      100: "#BEEBE9",
      200: "#f7fafc",
      300: "#FFB6BA",
      400: "#FF6161",
      500: "#F7EEC7"
      // // ...
      // 900: "#1a202c",
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
      <UsersProvider>
        <FriendProvider>
          <App />
        </FriendProvider>
      </UsersProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
