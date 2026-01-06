# Board Game Assistant App 🎲

AI-powered assistant app for board game setup and rule questions. Supports iOS and Android with ads and subscription monetization.

## Features

- 🎯 **Game Selection**: Choose from popular board games (Catan, Ticket to Ride, Wingspan, Terraforming Mars, Pandemic)
- 🤖 **AI-Powered Assistance**: Get instant answers to setup and rule questions
- 📱 **Cross-Platform**: Works on both iOS and Android
- 💰 **Monetization Ready**: Includes AdMob integration and subscription support
- 🆓 **100% Free to Build**: Uses only free tools and services

## Tech Stack

- **Framework**: React Native with Expo
- **UI Library**: React Native Paper
- **Navigation**: React Navigation
- **AI API**: Google Gemini API (Tier 1)
- **Ads**: Google AdMob
- **Platform**: iOS & Android

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- A computer (Windows, Mac, or Linux)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/luka-utvic/boardgame-assistant-app.git
cd boardgame-assistant-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up free AI API (Google Gemini)**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Create a free API key
   - Create a file called `.env` in the root directory
   - Add your API key:
```
GEMINI_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm start
```

5. **Run on your device**
   - Install "Expo Go" app on your phone (iOS or Android)
   - Scan the QR code shown in the terminal
   - The app will load on your phone

## Project Structure

```
boardgame-assistant-app/
├── App.js                      # Main app entry point
├── package.json                # Dependencies and scripts
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Welcome/home screen
│   │   ├── GameSelectionScreen.js  # Game picker
│   │   └── QuestionScreen.js   # AI Q&A interface
│   ├── components/
│   │   └── Banner.js           # Ad banner component
│   ├── services/
│   │   └── aiService.js        # AI API integration
│   └── data/
│       └── games.js            # Board game data
```

## Complete the App

The basic structure is created. You need to add these remaining files:

### 1. Create `src/screens/GameSelectionScreen.js`
```javascript
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
```

### 2. Create `src/screens/QuestionScreen.js`
```javascript
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card, Paragraph, ActivityIndicator } from 'react-native-paper';
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
```

### 3. Create `src/data/games.js`
```javascript
export const games = [
  {
    id: '1',
    name: 'Catan',
    description: 'Build settlements and trade resources',
  },
  {
    id: '2',
    name: 'Ticket to Ride',
    description: 'Connect railway routes across the map',
  },
  {
    id: '3',
    name: 'Wingspan',
    description: 'Bird-collection, engine-building game',
  },
  {
    id: '4',
    name: 'Terraforming Mars',
    description: 'Make Mars habitable for humanity',
  },
  {
    id: '5',
    name: 'Pandemic',
    description: 'Cooperative game to save humanity',
  },
];
```

### 4. Create `src/services/aiService.js`
```javascript
import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

export async function askQuestion(gameName, question) {
  const prompt = `You are a helpful board game assistant. The user is playing "${gameName}". 
They have the following question: "${question}"

Provide a clear, helpful answer about the game's rules, setup, or gameplay. 
Keep the answer concise (2-3 paragraphs max).`;

  try {
    const response = await axios.post(API_URL, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
}
```

### 5. Create `src/components/Banner.js`
```javascript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Banner as PaperBanner } from 'react-native-paper';

export function Banner() {
  const [visible, setVisible] = useState(true);

  // This is a placeholder for AdMob banner
  // In production, replace with actual AdMob BannerAd component
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <PaperBanner
        visible={visible}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setVisible(false),
          },
        ]}
      >
        Ad space - Integrate AdMob here for monetization
      </PaperBanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe082',
  },
});
```

### 6. Create `.env` file in root directory
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 7. Update `package.json` to include env support
Add this dependency:
```json
"react-native-dotenv": "^3.4.9"
```

Then create `babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }]
    ]
  };
};
```

## Adding Real Ads (AdMob)

1. Sign up for Google AdMob: [https://admob.google.com](https://admob.google.com)
2. Create an app in AdMob console
3. Get your Ad Unit IDs
4. Install expo-ads-admob: `expo install expo-ads-admob`
5. Replace the Banner component with real AdMob banners

## Publishing to App Stores

### For Google Play Store:
1. Build: `expo build:android`
2. Download the APK/AAB
3. Create developer account ($25 one-time)
4. Upload to Play Console

### For Apple App Store:
1. Build: `expo build:ios`
2. Download the IPA
3. Join Apple Developer Program ($99/year)
4. Upload via App Store Connect

## Monetization

- **Free users**: See banner ads
- **Premium subscription**: Remove ads ($2.99/month)
- Use Expo's in-app purchases for subscriptions

## Free Tier Limits

- **Gemini API**: 60 requests per minute (free)
- **Expo**: Unlimited for development
- **AdMob**: No limits, you earn money!

## Support

Questions? Open an issue on GitHub!

## License

MIT License - Free to use and modify!
