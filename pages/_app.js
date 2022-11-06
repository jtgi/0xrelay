import { ChakraProvider } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import theme from '../theme';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import Head from 'next/head';
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
    <>
      <Head>
        <meta property="og:title" content="Welcome to Cookie and Rock" />
        <meta property="og:site_name" content="Cookie and rock" />
        <meta property="og:description" content="The best place to..." />
        <meta property="og:image" content="/logo/cookieandrock-logo.png" />
        <meta name="theme-color" content="#55bbee" />
        <meta name="twitter:card" content="summary_large_image" />

      </Head>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <div style={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
                flexDirection: 'column'
              }}>
                <div style={{ maxWidth: 500, margin: '0 auto' }}>
                  <Component {...pageProps} />
                </div>
              </div>
            </QueryClientProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default OxRelay
