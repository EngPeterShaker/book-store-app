import React, { createContext, useContext, useMemo } from 'react';
import { ApiClient } from '@book-store/api-client';
import config from '../constants/config';

interface ApiContextValue {
  apiClient: ApiClient;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiClient = useMemo(() => new ApiClient(config.apiUrl), []);

  return <ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextValue => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};
