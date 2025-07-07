import axios from 'axios';

const API_URL = 'http://localhost:5000/analyze';

export const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data.analysis;
  } catch (error) {
    throw new Error('Error analyzing sentiment: ' + error.message);
  }
};