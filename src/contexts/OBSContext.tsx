import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { OBSServer } from './../services/obs';
import { Flex, Spinner, Button, Heading } from '@chakra-ui/react';

type Props = {
  children: ReactNode
}

interface OBSContextData {
  sceneActive: string;
  scenes: string[];
  setActiveScene: (scene: string) => void;
}

const OBS = new OBSServer();
const OBSContext = createContext({} as OBSContextData);

export default ({ children }: Props) => {
  const [scenes, setScenes] = useState<string[]>([]);
  const [sceneActive, setSceneActive] = useState('');
  const [loading, setLoading] = useState(true);

  async function initOBS() {
    await OBS.init('localhost:4444', 'alvim');
    OBS.scenes.subscribe(setScenes);
    OBS.currentScene.subscribe(setSceneActive);
    setLoading(false);
  }

  async function setActiveScene(scene: string) {
    await OBS.setActiveScene(scene);
  }

  useEffect(() => {
    initOBS();
  }, [])

  if (loading) {
    return (
      <Flex flexDir="column" h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading as="h4" mb="7">Reinicie o OBS</Heading>
        <Spinner size="lg" my="5" color="white" />
        <Button bg="gray.600" _hover={{ bg: "gray.500" }} mt="4" onClick={initOBS} cursor="pointer" my="2">Reconectar</Button>
      </Flex>
    )
  }

  return (
    <OBSContext.Provider value={{ sceneActive, scenes, setActiveScene }}>
      {children}
    </OBSContext.Provider>
  )
}

export function useOBS() {
  return useContext(OBSContext);
}