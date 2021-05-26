import dotenv from 'dotenv'
import Pluggy from 'pluggy-js'

dotenv.config()

const { PLUGGY_API_KEY: pluggyApiKey } = process.env
const client = new Pluggy(pluggyApiKey)

void (async function(): Promise<void> {

  try {
    await client.fetchConnectors()
    console.log('Successfully connected to Pluggy, using Pluggy Api Key')
  } catch {
    console.log(`Can't communicate with API, please review client id and secret`)
  }
})()
