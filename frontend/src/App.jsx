import React, { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testBackendApi = async () => {
    setLoading(true);
    try {
      let res;
      try {
        res = await fetch(API_URL + '/api/health');
      } catch {
        res = await fetch('http://localhost:8000/api/health');
      }
      const data = await res.json();
      setApiResponse({ status: 'success', data });
    } catch (err) {
      setApiResponse({ status: 'offline', error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', width: '90%', background: '#131b2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(6,182,212,0.15)', color: '#06b6d4', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        [ARCH] Dual-Tier Microservice Architecture
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        RapidFire Full-Stack Application
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Frontend (React 18 Vite) connected to Backend API with pre-configured CORS and GitLeaks security.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCount(c => c + 1)}>State Counter: {count}</button>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#059669', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={testBackendApi} disabled={loading}>{loading ? 'Pinging Backend...' : 'Test Backend API (/api/health)'}</button>
      </div>
      {apiResponse && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '8px', background: apiResponse.status === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: '1px solid ' + (apiResponse.status === 'success' ? '#10b981' : '#ef4444'), textAlign: 'left', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <div style={{ fontWeight: 'bold', color: apiResponse.status === 'success' ? '#34d399' : '#f87171', marginBottom: '0.35rem' }}>
            {apiResponse.status === 'success' ? '[200 OK] Backend Microservice Connected!' : '[OFFLINE] Backend Server Offline (Run backend server)'}
          </div>
          <pre style={{ margin: 0, color: '#e2e8f0' }}>{JSON.stringify(apiResponse.data || { error: apiResponse.error }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
