import { ethers } from 'ethers';
import PScale from "../../db";

const db = new PScale();
const provider = new ethers.providers.InfuraProvider(
  1,
  '2dcc855f5292468198c2f90c9a73bce1'
);

export default async function lookup(req, res) {
  let { recipientAddress, senderDiscordId } = req.query;

  if (!recipientAddress || !senderDiscordId) {
    return res.status(400).json({
      message: 'missing query params: /lookup?recipientAddress=0x11&senderDiscordId=123'
    })
  }

  const resolvedAddress = await provider.resolveName(recipientAddress.toLowerCase()) || recipientAddress;
  const discordId = await db.walletToDiscordId(resolvedAddress);
  const senderAddress = await db.discordIdToWallet(senderDiscordId)

  if (!discordId) {
    return res.status(400).json({
      code: 1,
      message: `${resolvedAddress} hasn't registered yet. Visit https://0xrelay.vercel.app.`
    });
  }

  if (!senderAddress) {
    return res.status(400).json({
      code: 2,
      message: `You haven't registered yet. Visit https://0xrelay.vercel.app.`
    });
  }

  return res.json({
    recipientDiscordId: discordId.discord_id,
    senderAddress: senderAddress.wallet
  });
}
