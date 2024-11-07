import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './provider/WagmiProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WagmiProvider config={wagmiConfig as any}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
