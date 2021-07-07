import { useEffect, useState } from 'react';

import { Container, Image, Text } from './styles'
import { OBSServer } from './../../services/obs';

const WebSocket = require('ws');
const ws = new WebSocket('http://localhost:8080');
ws.on("message", () => {
  console.log('recebendo data do Server')
});

const OBS = new OBSServer();

export function Greetings() {
  const [scenes, setScenes] = useState<string[]>([]);
  const [sceneActive, setSceneActive] = useState('');

  async function initOBS() {
    await OBS.init('localhost:4444', 'alvim');
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


    </Container>
  )
}

