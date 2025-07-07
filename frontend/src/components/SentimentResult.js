import React from 'react';

const SentimentResult = ({ analysis }) => {
  return (
    <div>
      <h2>Sentiment Analysis Result</h2>
      <p>{analysis}</p>
    </div>
  );
};

export default SentimentResult;