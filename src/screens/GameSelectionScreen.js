import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Divider } from 'react-native-paper';
import { games } from '../data/games';
import { Banner } from '../components/Banner';
import Colors from '../theme/colors';

export default function GameSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.inkBlack} />
      <Banner />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Board Game Assistant</Text>
        <Text style={styles.headerSubtitle}>Select your game to get started</Text>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.gameCard}
              onPress={() => navigation.navigate('Question', { gameName: item.name })}
              activeOpacity={0.7}
            >
              <View style={styles.gameContent}>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
            <Divider style={styles.divider} />
          </>
        )}
        contentContainerStyle={styles.listContainer}
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
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  gameCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    flex: 1,
  },
  arrow: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});
