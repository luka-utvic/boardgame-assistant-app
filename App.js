import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameSelectionScreen from './src/screens/GameSelectionScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import Colors from './src/theme/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.imperialBlue,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 2,
              borderBottomColor: Colors.primary,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            cardStyle: {
              backgroundColor: Colors.background,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={GameSelectionScreen}
            options={{ 
              title: 'Select Game',
            }}
          />
          <Stack.Screen 
            name="Question" 
            component={QuestionScreen}
            options={({ route }) => ({ 
              title: route.params?.gameName || 'Ask Question',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
