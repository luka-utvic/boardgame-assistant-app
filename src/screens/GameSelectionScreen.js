import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { games } from '../data/games';
import { Banner } from '../components/Banner';

export default function GameSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Banner />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.name}
              description={item.description}
              left={props => <List.Icon {...props} icon="dice-multiple" />}
              onPress={() => navigation.navigate('Question', { 
                gameName: item.name,
                gameId: item.id 
              })}
            />
            <Divider />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
