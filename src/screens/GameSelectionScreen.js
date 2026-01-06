import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { games } from '../data/games';
import { Banner } from '../components/Banner';
import Colors from '../theme/colors';

export default function GameSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.inkBlack} />
      <Banner />
      
      <View style={styles.header}>
        <Text style={colors.'inkblack'}>Board Game Assistant</Text>
        <Text style={styles.headerSubtitle}>Select your game to get started</Text>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gameCard}
            onPress={() => navigation.navigate('Question', { gameName: item.name })}
            activeOpacity={0.85}
          >
            <Text style={styles.gameName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    opacity: 0.9,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
  gameCard: {
    backgroundColor: Colors.egyptianBlue,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  gameName: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.white,
    letterSpacing: 0.2,
  },
});
