import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native';
import { games } from '../data/games';
import Banner from '../../Banner';
import Colors from '../theme/colors';

export default function GameSelectionScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter games based on search query
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle game selection from dropdown
  const handleGameSelect = (game) => {
    setSearchQuery(game.name);
    setShowDropdown(false);
    navigation.navigate('Question', { gameName: game.name });
  };

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setShowDropdown(text.length > 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.inkBlack} />
      <Banner />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Board Game Assistant</Text>
        <Text style={styles.headerSubtitle}>Select your game to get started</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a game..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
        />
        
        {/* Dropdown Menu */}
        {showDropdown && filteredGames.length > 0 && (
          <View style={styles.dropdownContainer}>
            <ScrollView 
              style={styles.dropdown}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredGames.slice(0, 10).map((game) => (
                <TouchableOpacity
                  key={game.id}
                  style={styles.dropdownItem}
                  onPress={() => handleGameSelect(game)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownItemText}>{game.name}</Text>
                  <Text style={styles.dropdownItemDescription} numberOfLines={1}>
                    {game.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Game List */}
      <FlatList
        data={filteredGames}
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
    color: Colors.inkblack,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.inkblack,
    borderWidth: 1,
    borderColor: Colors.egyptianBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    zIndex: 1001,
  },
  dropdown: {
    maxHeight: 250,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.egyptianBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.inkblack,
    marginBottom: 4,
  },
  dropdownItemDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    opacity: 0.8,
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
