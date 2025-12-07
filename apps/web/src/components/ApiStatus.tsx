import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ApiStatus: React.FC = () => {
  const { t, dir } = useLanguage();
  const [status, setStatus] = useState<{
    isConnected: boolean;
    message: string;
    apiUrl: string;
  }>({
    isConnected: false,
    message: t('api.checking'),
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
            message: t('api.authRequired'),
            apiUrl
          });
        } else if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setStatus({
              isConnected: true,
              message: `${t('api.connectedPrefix')} (${data.length} ${t('api.booksFound')})`,
              apiUrl
            });
          } else {
            setStatus({
              isConnected: false,
              message: t('api.invalidFormat'),
              apiUrl
            });
          }
        } else {
          setStatus({
            isConnected: false,
            message: `${t('api.httpErrorPrefix')}: ${response.status}`,
            apiUrl
          });
        }
      } catch (error) {
        setStatus({
          isConnected: false,
          message: `${t('api.connectionFailed')}: ${error instanceof Error ? error.message : t('api.unknownError')}`,
          apiUrl
        });
      }
    };

    checkApiConnection();
  }, [t]);

  return (
    <div
      dir={dir}
      style={{
        padding: '10px',
        margin: '10px',
        border: `2px solid ${status.isConnected ? '#28a745' : '#dc3545'}`,
        borderRadius: '5px',
        backgroundColor: status.isConnected ? '#d4edda' : '#f8d7da',
        color: status.isConnected ? '#155724' : '#721c24'
      }}
    >
      <strong>{t('api.statusTitle')}:</strong>
      <div>{t('api.urlLabel')}: {status.apiUrl}</div>
      <div>{status.message}</div>
      {!status.isConnected && (
        <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
          <strong>{t('api.solutionsTitle')}:</strong>
          <ul>
            <li>{t('api.solution.local')}</li>
            <li>{t('api.solution.production')}</li>
            <li>{t('api.solution.alternative')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiStatus;
