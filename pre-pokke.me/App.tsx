import './global.css';

import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import RootStack from '~/navigation';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <RootStack />
    </SafeAreaView>
  );
}
