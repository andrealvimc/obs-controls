import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { OBSServer } from './../services/obs';

const OBS = new OBSServer();


export default () => {
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket('ws://localhost:8080');
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

  useEffect(() => {
    console.log(lastMessage)
  }, [lastMessage]);

  const handleActiveScene = async (scene: string) => {
    await OBS.setActiveScene(scene);
  }


  return (
    <div>
      <p>{sceneActive}</p>
      <ul>
        {scenes.map((scene, index) => (
          <li key={index}>
            <button onClick={() => handleActiveScene(scene)}>
              {scene}
            </button>
          </li>
        ))}
      </ul>


    </div>
  )
}
