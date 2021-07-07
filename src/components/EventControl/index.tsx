import React, { useEffect } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  useDisclosure,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEvent } from './../../hooks/event/useEvent';
import { useOBS } from '../../contexts/OBSContext';

type Props = {
  eventKey: string;
  setEventKey: (eventKey: string) => void
}

export default ({ eventKey, setEventKey }: Props) => {
  const { event: { widget, title }, loading } = useEvent(eventKey);
  const { sceneActive, scenes, setActiveScene } = useOBS();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function widgetChange(widgetTitle: string) {
    const widgetLeft = widgetTitle.split('[')[1];
    const widget = widgetLeft.split(']')[0];
    setActiveScene(widget);
  }

  useEffect(() => {
    if (widget) {
      widgetChange(widget.title);
    }
  }, [widget]);

  if (loading) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    )
  }

  if (!title) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Text color="white">Evento não encontrado!</Text>
        <Button my="2" onClick={() => setEventKey('')}>Clique para voltar</Button>
      </Flex>
    )
  }


  return (
    // <Flex>
    //   <Sidebar scenes={scenes} />
    //   <div>
    //     <p>Evento: {title}</p>
    //     <br />
    //     <p>{sceneActive}</p>
    //     <br />
    //     <br />
    //     <br />
    //     <ul>
    //       {scenes.map((scene, index) => (
    //         <li key={index}>
    //           <button onClick={() => setActiveScene(scene)}>
    //             {scene}
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </Flex>
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent color="white" bg="gray.800">
        <ModalHeader>Conectado</ModalHeader>

        <ModalBody>
          <Text>Você está conectado ao evento: <b>{title}</b></Text>
          <Text mb="4">Cena ativa: {sceneActive ? sceneActive : 'Nenhuma'}</Text>

          {scenes.map((scene, index) => (
            <Button key={index} my="2" w="100%" bg={`${sceneActive === scene ? 'green.500' : 'gray.600'}`} onClick={() => setActiveScene(scene)} _hover={{ bg: `${sceneActive === scene ? 'green.400' : 'gray.500'}` }}>
              {scene}
            </Button>
          ))}

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" my="2" onClick={() => setEventKey('')}>Desconectar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}