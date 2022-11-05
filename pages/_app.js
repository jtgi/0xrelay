import { ChakraProvider } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: 'https://eth-mainnet.g.alchemy.com/v2/cU2jmN7xeOr6bfdgEVzbpfkvJMWy9X__' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: '0xRelay',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const queryClient = new QueryClient();

function OxRelay({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default OxRelay
