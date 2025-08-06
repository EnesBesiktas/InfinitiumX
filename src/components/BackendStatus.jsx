import React, { useState, useEffect } from 'react';
import { getHealth } from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    getHealth()
      .then(response => {
        if (response.status === 200) {
          setStatus('Backend is healthy!');
        } else {
          setStatus(`Backend returned status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Error fetching backend health:', error);
        setStatus('Error connecting to backend. Is the backend running?');
      });
  }, []);

  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h4>Backend Connection Status</h4>
      <p>{status}</p>
    </div>
  );
};

export default BackendStatus;
