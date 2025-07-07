import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data.analysis || data.error);
    } catch (err) {
      setResult('Error connecting to backend');
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
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <button type="submit" disabled={loading || !text.trim()} style={{ marginTop: 8 }}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 16, padding: 12, background: '#f0f0f0' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default App;