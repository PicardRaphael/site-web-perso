import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // turn off retries for testing
      },
    },
  });
  return queryClient;
};

export const QueryClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
