import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}