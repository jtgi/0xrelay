import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DiscordLoginButton, SlackLoginButton, TelegramLoginButton, TwitterLoginButton } from "react-social-login-buttons";

export default function Dashboard() {
  const router = useRouter();

  const style = {
    padding: '90px 40px',
    borderRadius: 10,
    fontWeight: 800,
    border: '1px transparent #000',
    textAlign: 'center'
  }

  return (
    <div>
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
