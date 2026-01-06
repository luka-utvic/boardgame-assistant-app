import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { askQuestion } from '../services/aiService';
import Banner from '../../Banner';
import Colors from '../theme/colors';

export default function QuestionScreen({ route }) {
  const { gameName, gameId } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const result = await askQuestion(gameName, question);
      setAnswer(result);
    } catch (error) {
      setAnswer('Sorry, there was an error processing your question. Please try again.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.inkBlack} />
      <Banner />
      
      <View style={styles.header}>
        <Text style={styles.gameTitle}>{gameName}</Text>
        <Text style={styles.headerSubtitle}>Ask any question about the game</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputSection}>
          <Text style={styles.label}>Your Question</Text>
          <TextInput
            placeholder="e.g., How do I set up the board?"
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholderTextColor={Colors.inkBlack}
          />
          <TouchableOpacity
            onPress={handleAsk}
            disabled={loading || !question.trim()}
            style={[
              styles.button,
              (loading || !question.trim()) && styles.buttonDisabled
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Thinking...' : 'Ask Question'}
            </Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Getting your answer...</Text>
          </View>
        )}

        {answer !== '' && !loading && (
          <View style={styles.answerSection}>
            <Text style={styles.answerLabel}>Answer</Text>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: Colors.background,
  },
  gameTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.inkBlack,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.egyptianBlue,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.white,
    minHeight: 110,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  answerSection: {
    marginTop: 10,
    backgroundColor: Colors.egyptianBlue,
    borderRadius: 12,
    padding: 20,
  },
  answerLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 25,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});
