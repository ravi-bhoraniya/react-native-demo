import * as React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from "./screen/Home";
import Detail from "./screen/Detail";
import AddProduct from "./screen/AddProduct";

LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Warning: ...', 'Animated: `useNativeDriver`', 'VirtualizedLists should never be nested', 'componentWillReceiveProps', 'Possible Unhandled Promise Rejection']);

export default function Main() {
      return (
            <NavigationContainer>
                  <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                        <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
                  </Stack.Navigator>
            </NavigationContainer>
      );
}