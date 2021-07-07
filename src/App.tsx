import { ChakraProvider } from '@chakra-ui/react';

import { Greetings } from './components/Greetings'
import Home from './Screens/Home';
import { theme } from './styles/theme';

export function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </>
  )
}