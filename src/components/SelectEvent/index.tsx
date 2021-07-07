import React, { useState } from 'react';
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
  useDisclosure
} from '@chakra-ui/react';

type Props = {
  setEventKey: (eventKey: string) => void
}

export default ({ setEventKey }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputEvent, setInputEvent] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubimit = () => {
    setLoading(true);
    setTimeout(() => {
      setEventKey(inputEvent);
      setLoading(false)
    }, 1000)
  }

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent color="white" bg="gray.800">
        <ModalHeader>Digite o id do seu evento</ModalHeader>

        <ModalBody>
          <Input value={inputEvent} onChange={(e) => setInputEvent(e.target.value)} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" isLoading={loading} isDisabled={inputEvent.length < 1} onClick={handleSubimit}>Entrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}