import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     gcTime: 5 * 60 * 1000,
  //     staleTime: 30 * 1000,
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: true,
  //     refetchInterval: 60 * 1000
  //   },
  // },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
