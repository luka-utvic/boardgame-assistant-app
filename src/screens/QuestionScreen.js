import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card, Paragraph } from 'react-native-paper';
import { askQuestion } from '../services/aiService';
import { Banner } from '../components/Banner';

export default function QuestionScreen({ route }) {
  const { gameName, gameId } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await askQuestion(gameName, question);
      setAnswer(response);
    } catch (error) {
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Banner />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.gameName}>Playing: {gameName}</Paragraph>
          </Card.Content>
        </Card>

        <TextInput
          label="Ask a question"
          value={question}
          onChangeText={setQuestion}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          placeholder="e.g., How do I set up the game for 4 players?"
        />

        <Button
          mode="contained"
          onPress={handleAsk}
          loading={loading}
          disabled={loading || !question.trim()}
          style={styles.button}
        >
          Ask Assistant
        </Button>

        {answer && (
          <Card style={styles.answerCard}>
            <Card.Content>
              <Paragraph style={styles.answer}>{answer}</Paragraph>
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  answerCard: {
    backgroundColor: '#e3f2fd',
  },
  answer: {
    fontSize: 15,
    lineHeight: 22,
  },
});
