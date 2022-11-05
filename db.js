import mysql from 'mysql2';

export default class PScale {
  constructor() {
    this.conn = mysql.createConnection(process.env.DATABASE_URL)
  }

  async discordIdToWallet(discordId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE discord_id=?";
      this.conn.query(query, [discordId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  async walletToDiscordId(wallet) {
    return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE wallet=?";
      this.conn.query(query, [wallet], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0]);
      }
    });
    })
  }

  async getUsers() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users";
      this.conn.query(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async saveUser({ wallet, discordId }) {
    const query = "INSERT INTO users (wallet, discord_id) VALUES (?, ?)";
    this.conn.query(query, [wallet, discordId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }
}