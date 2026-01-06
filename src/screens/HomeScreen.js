import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { Banner } from '../components/Banner';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Banner />
      
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}><font color ='inkblack'>Welcome to Board Game Assistant!</font color></Title>
            <Paragraph style={styles.paragraph}>
              Your AI-powered companion for all your board gaming needs.
            </Paragraph>
            <Paragraph style={styles.features}>
              • Step-by-step setup guides{'\n'}
              • Instant rule clarifications{'\n'}
              • Game-specific assistance{'\n'}
              • Quick reference for phases and turns
            </Paragraph>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('GameSelection')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Get Started
        </Button>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Paragraph style={styles.info}>
              Select your board game and ask any question about setup, rules, or gameplay. 
              Our AI assistant is here to help make your gaming experience smooth and enjoyable!
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  features: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#3498db',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  infoCard: {
    marginTop: 10,
    backgroundColor: '#e8f4f8',
  },
  info: {
    fontSize: 14,
    color: '#34495e',
  },
});
