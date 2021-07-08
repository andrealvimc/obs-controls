import { ChakraProvider } from '@chakra-ui/react';

import OBSContext from './contexts/OBSContext';
import Home from './Screens/Home';
import Graphql from './services/Graphql';
import { theme } from './styles/theme';

export function App() {
  return (
    <>

      <ChakraProvider theme={theme}>
        <OBSContext>
          <Graphql>
            <Home />
          </Graphql>
        </OBSContext>
      </ChakraProvider>
    </>
  )
}