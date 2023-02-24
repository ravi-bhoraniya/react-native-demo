/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Main from './src/Main';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Main);
