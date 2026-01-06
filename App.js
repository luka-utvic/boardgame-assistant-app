import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameSelectionScreen from './src/screens/GameSelectionScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Board Game Assistant' }}
          />
          <Stack.Screen 
            name="GameSelection" 
            component={GameSelectionScreen}
            options={{ title: 'Select a Game' }}
          />
          <Stack.Screen 
            name="Question" 
            component={QuestionScreen}
            options={({ route }) => ({ 
              title: route.params?.gameName || 'Ask Question' 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
