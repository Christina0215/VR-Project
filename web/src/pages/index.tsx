import styles from './index.less';
import 'aframe';
import {Entity, Scene} from 'aframe-react';

export default function IndexPage() {
  return (
    <Scene>
      <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
      <Entity light={{type: 'point'}}/>
      <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
      <Entity text={{value: 'Hello, WebVR!'}}/>
    </Scene>
  );
}
