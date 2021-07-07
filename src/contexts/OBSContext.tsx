import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { OBSServer } from './../services/obs';
import { Flex, Spinner } from '@chakra-ui/react';

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
      <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
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