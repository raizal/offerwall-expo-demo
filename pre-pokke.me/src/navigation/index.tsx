import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OfferwallScreen from '~/screens/offerwall.screen';

export type RootStackParamList = {
  Offerwall: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Offerwall" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Offerwall" component={OfferwallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
