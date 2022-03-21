import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"

// Components
import App from './components/App.jsx'

// Contexts
import UsersProvider from './components/providers/UsersProvider.jsx';


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
      // 100: "#BEEBE9", //blue
      // 200: "#f7fafc", //off-white
      // 300: "#FFB6BA", //pink
      // 400: "#FF6161", //tomato
      // 500: "#F7EEC7", //pastel yellow
      // 600: "#d2f1f0", // lighter blue
      // 700: "#97dfdc", // darker blue
      // 800: '#36454F', // dark gray
      100: "#9ADCFF", //blue,
      110: "#7C99AC", // lt grey blue
      120: "#476072", // darker grey blue
      200: "#f7fafc", //off-white
      300: "#FF8AAE", //pink
      310: "#FFB2A6", //peach
      400: "#FF6161", //tomato
      500: "#FFF89A", //pastel yellow
      700: "#97dfdc", // darker blue
      800: '#36454F', // dark gray
      // // ...
      // 900: "#1a202c",
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
      <UsersProvider>

          <App />

      </UsersProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
