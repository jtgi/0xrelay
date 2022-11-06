import axios from 'axios';
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, APP_URI } = process.env;

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send();
  }

    const { data } = await axios.post(
      'https://discord.com/api/v8/oauth2/token',
      new URLSearchParams({
        'client_id': DISCORD_CLIENT_ID,
        'client_secret': DISCORD_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': `${APP_URI}/api/discord-oauth`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

  return res.redirect('/discord?discord-jwt=' + data.access_token)
}