import dotenv from 'dotenv'
import Pluggy from 'pluggy-js'

dotenv.config()
const { PLUGGY_API_KEY, PLUGGY_API_URL } = process.env

void (async function(): Promise<void> {
  const client = new Pluggy(PLUGGY_API_KEY, PLUGGY_API_URL || undefined)

  try {
    await client.fetchConnectors()
    console.log('Successfully connected to Pluggy, using Pluggy Api Key')
  } catch {
    console.log(`Can't communicate with API, please review client id and secret`)
  }
})()
