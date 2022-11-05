import axios from 'axios';
import { verifyMessage } from 'ethers/lib/utils';
import PScale from '../../db';

const db = new PScale();

export default async function handler(req, res) {
  const { discordJWT, signature, address } = req.body;
  const message = `This is 0xRelay. Dear ${address}, May I have your autograph?`;

  const recoveredAddress = verifyMessage(message, signature);
  if (recoveredAddress !== address) {
    res.status(400).json({
      message: 'Signature does not match address'
    });
  }

  const discordUser = await fetchDiscordUser(discordJWT);

  const user = {
    wallet: address.toLowerCase(),
    discordId: discordUser.id
  }

  await db.saveUser(user);
  res.json(user);
}

const fetchDiscordUser = async (jwt) => {
  const { data } = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return data;
}
