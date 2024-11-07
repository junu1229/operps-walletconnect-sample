import { arbitrumSepolia, bsc, bscTestnet, arbitrum } from 'wagmi/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createAppKit } from '@reown/appkit/react';
import { CreateConnectorFn } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

const projectId = import.meta.env[`VITE_WALLETCONNECTPROJECTID`];
const environment = import.meta.env[`VITE_NETWORK`];
const isEnvirontmentMainnet = environment === 'MAINNET';

const networks = [arbitrum, arbitrumSepolia, bsc, bscTestnet];
const connectors: CreateConnectorFn[] = [];
connectors.push(metaMask());

const wagmiAdapter = new WagmiAdapter({
  networks,
  connectors,
  projectId,
  multiInjectedProviderDiscovery: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [arbitrum, arbitrumSepolia, bsc, bscTestnet],
  projectId,
  features: {
    email: false,
    onramp: true,
    swaps: false,
    socials: false,
  },
  featuredWalletIds: isEnvirontmentMainnet
    ? [
        'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ]
    : [
        'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
        '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489',
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ],
  includeWalletIds: isEnvirontmentMainnet
    ? [
        'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ]
    : [
        'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
        '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489',
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ],
  allWallets: 'HIDE',
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
