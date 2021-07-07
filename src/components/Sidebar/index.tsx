import React from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  scenes: string[];
}

export default ({ scenes }: Props) => {
  return (
    <Box h="100vh" w="300px" bg="gray.700" p="3">
      teste
    </Box>
  )
}