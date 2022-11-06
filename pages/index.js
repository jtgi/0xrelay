import { Heading, VStack } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

export default function Home() {
  const router = useRouter();

  useAccount({
    onConnect: async () => {
      router.push('/dashboard');
    }
  })

  return (
    <div>
      <Head>
        <title>0xRelay</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="0xRelay - Message any ethereum address." />
        <meta property="og:site_name" content="0xRelay" />
        <meta property="og:description" content="0xRelay web3 messages to all your " />
        <meta name="theme-color" content="#55bbee" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <VStack spacing={25}>
        <div>
          <Heading as="h1" size={"3xl"} css={{
            background: 'linear-gradient(to right, #30CFD0, #c43ad6);',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
          }}>0xRelay</Heading>

          <Heading as="h2" size="xl">Message any ethereum account from apps you love</Heading>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ConnectButton />
        </div>
      </VStack>
    </div>
  );
}
