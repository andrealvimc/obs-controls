import OBSWebSocket from 'obs-websocket-js';
import { BehaviorSubject, Subscriber } from 'rxjs';
const obs = new OBSWebSocket();

export class OBSServer {
  currentScene = new BehaviorSubject('');
  scenes = new BehaviorSubject<string[]>([]);

  async init(address: string, password?: string) {
    await obs.connect({ address: address, password: password });
    this.updateScenes();
    obs.on('SwitchScenes', data => {
      this.currentScene.next(data['scene-name']);
    });

    obs.on("ScenesChanged", (data) => {
      this.updateScenes();
    });
  }

  async updateScenes(): Promise<void> {
    const data = await obs.send('GetSceneList');

    const scenes = data.scenes.map(scene => scene.name);
    this.scenes.next(scenes);
  }

  async setActiveScene(sceneName: string) {
    return obs.send('SetCurrentScene', { "scene-name": sceneName });
  }

}