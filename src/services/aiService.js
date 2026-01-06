import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
export async function askQuestion(gameName, question) {
  const prompt = `You are a helpful board game assistant. The user is playing "${gameName}". They have the following question: "${question}"

Provide a clear, helpful answer about the game's rules, setup, or gameplay. Keep the answer concise (2-3 paragraphs max).`;

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
    console.error('AI API Error:', error.response?.data || error.message);
    throw error;
  }
}
