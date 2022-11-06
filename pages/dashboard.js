import { Heading, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import JSConfetti from 'js-confetti';


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DiscordLoginButton, SlackLoginButton, TelegramLoginButton, TwitterLoginButton } from "react-social-login-buttons";

import { CheckIcon } from "@chakra-ui/icons";
import {
  Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay
} from '@chakra-ui/react';

export default function Dashboard() {
  const router = useRouter();
  const [show, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    if (params.get('success')) {
      setShowSuccess(true);
      params.delete('success')
    }

  }, [])

  const style = {
    padding: '90px 40px',
    borderRadius: 10,
    fontWeight: 800,
    border: '1px transparent #000',
    textAlign: 'center'
  }

  return (
    <div>
      {show && <SuccessModal />}
      <div>
        <VStack spacing={25}>
          <Heading as="h1" size={"2xl"}>Connect an account</Heading>
          <SimpleGrid columns={2} spacing={2}>
            <div><DiscordLoginButton onClick={() => router.push('/discord')} text="Discord" style={style} /></div>
            <div><TelegramLoginButton text="Telegram" style={style} /></div>
            <div><TwitterLoginButton text="Twitter" style={style} /></div>
            <div><SlackLoginButton text="Slack" style={style} /></div>
          </SimpleGrid>
        </VStack>
      </div>
    </div>
  )
}


function SuccessModal() {
  useEffect(() => {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['⚡️'],
    })
  }, [])
  return (
    <>
      <Modal isOpen={true}>
        <ModalOverlay />
        <ModalContent style={{ padding: 25 }}>
          <ModalHeader style={{ textAlign: 'center' }}><CheckIcon /> Success</ModalHeader>
          <ModalBody>
            <div style={{ textAlign: 'center' }}>
              <VStack spacing={5}>
                <div>You will now receive notifications in discord. Invite the 0xRelay bot to your server to get started.</div>
                <div>Or, try out our <Link href="https://discord.gg/vBqFhj85" color="teal.600" target="_blank">demo server here</Link></div>
              </VStack>
            </div>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}
