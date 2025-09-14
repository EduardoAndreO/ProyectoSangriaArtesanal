/**
 * @format
 */
import { enableScreens } from 'react-native-screens';
enableScreens();
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/translations/i18n';

AppRegistry.registerComponent(appName, () => App);
