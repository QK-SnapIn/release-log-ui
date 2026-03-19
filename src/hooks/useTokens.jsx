import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

const TokensContext = createContext(null);

export function TokensProvider({ children }) {
  const [connections, setConnections] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTokens = useCallback(async () => {
    try {
      const { data } = await api.get('/tokens');
      setServices(data.services || []);
      setConnections(data.connections || {});
    } catch {
      setServices([]);
      setConnections({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

  return (
    <TokensContext.Provider value={{ connections, services, loading, refetchTokens: fetchTokens }}>
      {children}
    </TokensContext.Provider>
  );
}

export function useTokens() {
  const ctx = useContext(TokensContext);
  if (!ctx) throw new Error('useTokens must be used within TokensProvider');
  return ctx;
}
