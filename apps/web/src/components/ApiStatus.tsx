import React, { useState, useEffect } from 'react';

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<{
    isConnected: boolean;
    message: string;
    apiUrl: string;
  }>({
    isConnected: false,
    message: 'Checking connection...',
    apiUrl: ''
  });

  useEffect(() => {
    const checkApiConnection = async () => {
      // Get the API URL that will be used
      const apiUrl = process.env.REACT_APP_API_URL || 
        (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001');
      
      try {
        const response = await fetch(`${apiUrl}/books`);
        
        if (response.status === 401) {
          setStatus({
            isConnected: false,
            message: '❌ Authentication required (Vercel SSO protection enabled)',
            apiUrl
          });
        } else if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setStatus({
              isConnected: true,
              message: `✅ Connected successfully (${data.length} books found)`,
              apiUrl
            });
          } else {
            setStatus({
              isConnected: false,
              message: '❌ Invalid data format received',
              apiUrl
            });
          }
        } else {
          setStatus({
            isConnected: false,
            message: `❌ HTTP Error: ${response.status}`,
            apiUrl
          });
        }
      } catch (error) {
        setStatus({
          isConnected: false,
          message: `❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          apiUrl
        });
      }
    };

    checkApiConnection();
  }, []);

  return (
    <div style={{
      padding: '10px',
      margin: '10px',
      border: `2px solid ${status.isConnected ? '#28a745' : '#dc3545'}`,
      borderRadius: '5px',
      backgroundColor: status.isConnected ? '#d4edda' : '#f8d7da',
      color: status.isConnected ? '#155724' : '#721c24'
    }}>
      <strong>API Status:</strong>
      <div>URL: {status.apiUrl}</div>
      <div>{status.message}</div>
      {!status.isConnected && (
        <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
          <strong>Solutions:</strong>
          <ul>
            <li>For local development: Make sure backend is running on port 3001</li>
            <li>For production: Disable Vercel SSO protection in dashboard</li>
            <li>Alternative: Deploy to a platform without SSO restrictions</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiStatus;
