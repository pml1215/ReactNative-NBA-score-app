import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Score from './components/score';
import FavoriteGames from './components/favorite_games';
import Standings from './components/standings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: true }}>
            <Stack.Screen name="NBA Score" component={Score} />
            <Stack.Screen name="Standings" component={Standings} />
            <Stack.Screen name="Favorite Games" component={FavoriteGames} />
          </Stack.Group>
        </Stack.Navigator>
      </Provider>
      <StatusBar backgroundColor="#2196F3" barStyle='dark-content'/>
    </NavigationContainer>
  );
}

