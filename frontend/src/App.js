import React, { useState } from 'react';

const MAX_LENGTH = 500;

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null); // Change to object/null
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const analyze = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate input length
    if (text.length > MAX_LENGTH) {
      setWarning(`Input too long (max ${MAX_LENGTH} characters).`);
      return;
    }

    // Validate non-text characters
    if (!/[a-zA-Z]/.test(text)) {
      setWarning('Please enter some text (not just symbols or emojis).');
      return;
    }

    setWarning('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      let parsed;
      try {
        parsed = JSON.parse(data.analysis);
      } catch {
        parsed = { raw: data.analysis || data.error };
      }
      setResult(parsed);
    } catch (err) {
      setResult({ raw: 'Error connecting to backend' });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Mood Meter</h2>
      <form onSubmit={analyze}>
        <textarea
          rows={4}
          style={{ width: '100%' }}
          maxLength={MAX_LENGTH}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <div style={{ fontSize: 12, color: '#888', textAlign: 'right' }}>
          {text.length}/{MAX_LENGTH}
        </div>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          style={{ marginTop: 8 }}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {warning && (
        <div style={{ color: 'red', marginTop: 8 }}>{warning}</div>
      )}
      {result && (
        <div style={{ marginTop: 16, padding: 12, background: '#f0f0f0' }}>
          {result.sentiment ? (
            <>
              <div><strong>Sentiment:</strong> {result.sentiment}</div>
              <div><strong>Justification:</strong> {result.justification}</div>
              <div><strong>Suggestion:</strong> {result.suggestion}</div>
            </>
          ) : (
            <div>{result.raw}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;