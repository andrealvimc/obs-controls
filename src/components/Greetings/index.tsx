import { useEffect, useState } from 'react';
import { Button } from '../Button'
import { Container, Image, Text } from './styles'
import { OBSServer } from './../../services/obs';

const OBS = new OBSServer();

export function Greetings() {
  const [scenes, setScenes] = useState<string[]>([]);
  const [sceneActive, setSceneActive] = useState('');

  async function initOBS() {
    await OBS.init();
    OBS.scenes.subscribe(setScenes);
    OBS.currentScene.subscribe(setSceneActive);
  }

  useEffect(() => {
    initOBS();
  }, []);

  const handleActiveScene = async (scene: string) => {
    await OBS.setActiveScene(scene);
  }

  return (
    <Container>
      <Text>{sceneActive}</Text>
      <ul>
        {scenes.map((scene, index) => (
          <li key={index}>
            <button onClick={() => handleActiveScene(scene)}>
              {scene}
            </button>
          </li>
        ))}
      </ul>

      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
      <Button>Send message to main process</Button>
    </Container>
  )
}

