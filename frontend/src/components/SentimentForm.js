import React, { useState } from 'react';
import { analyzeSentiment } from '../api/sentiment';

const SentimentForm = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeSentiment(text);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for sentiment analysis"
          rows="4"
          cols="50"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {analysis && <p>Analysis: {analysis}</p>}
    </div>
  );
};

export default SentimentForm;