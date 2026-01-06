import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { askQuestion } from '../services/aiService';
import { Banner } from '../components/Banner';
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
      >
        <Card style={styles.inputCard}>
          <Card.Content>
            <Text style={styles.label}>Your Question</Text>
            <TextInput
              mode="outlined"
              placeholder="e.g., How do I set up the board?"
              value={question}
              onChangeText={setQuestion}
              multiline
              numberOfLines={3}
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.primary}
              textColor={Colors.white}
              placeholderTextColor={Colors.textSecondary}
              theme={{
                colors: {
                  background: Colors.surface,
                  text: Colors.white,
                  placeholder: Colors.textSecondary,
                }
              }}
            />
            <Button
              mode="contained"
              onPress={handleAsk}
              loading={loading}
              disabled={loading || !question.trim()}
              style={styles.button}
              buttonColor={Colors.primary}
              textColor={Colors.white}
            >
              {loading ? 'Thinking...' : 'Ask Question'}
            </Button>
          </Card.Content>
        </Card>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Getting your answer...</Text>
          </View>
        )}

        {answer !== '' && !loading && (
          <Card style={styles.answerCard}>
            <Card.Content>
              <View style={styles.answerHeader}>
                <Text style={styles.answerLabel}>Answer</Text>
              </View>
              <Text style={styles.answerText}>{answer}</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  inputCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: Colors.surface,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 6,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  answerCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginTop: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  answerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
  },
});
