import { CheckIcon } from '@chakra-ui/icons';
import { Button, Spinner, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

export default function Discord() {
  const router = useRouter();
  const { address } = useAccount();
  const [discordJWT, setDiscordJWT] = useState();
  const [signature, setSignature] = useState();
  const message = `This is 0xRelay. Dear ${address}, May I have your autograph?`;

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const jwt = params.get('discord-jwt') || localStorage.getItem('discord-jwt');

    if (jwt) {
      localStorage.setItem('discord-jwt', jwt);
      setDiscordJWT(jwt);
    }

  }, []);

  const { mutate: onSave, isLoading, isSuccess } = useMutation(() => {
    return axios.post('/api/discord-connect', {
      address,
      discordJWT,
      signature
    });
  }, {
    onSuccess: () => {
      router.push('/dashboard');
    }
  })

  const sig = useSignMessage({
    onSuccess(data, variables) {
      setSignature(data);
    },
  })

  const discordOauth = () => {
    window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URI;
  }

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <VStack spacing={4} width={500}>
          <div>
            {discordJWT && <CheckIcon />} <OAuthButton onClick={discordOauth}>Connect Discord</OAuthButton>
          </div>
          <div>
            {signature && <CheckIcon />} <Button onClick={() => sig.signMessage({ message })}>Sign Message</Button>
          </div>
          <div>
            <Button onClick={onSave}>{isLoading && <span><Spinner />&nbsp;</span>}Save</Button>
          </div>
        </VStack>
      </div>
    </div>
  )
}

const OAuthButton = ({ onClick, ...props }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button {...props} onClick={(e) => {
      setLoading(true);
      onClick(e);
    }}
    >
      {loading && <span><Spinner />&nbsp;</span>}Connect Discord
    </Button>
  );
}