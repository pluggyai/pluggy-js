import dotenv from 'dotenv'
import Pluggy from 'pluggy-js'

dotenv.config()
const { PLUGGY_API_KEY: pluggyApiKey } = process.env
const client = new Pluggy(pluggyApiKey)

void (async function(): Promise<void> {
  try {
    const { accessToken: connectToken } = await client.createConnectToken()
    console.log(`Successfully created connectToken: ${connectToken}`)
  } catch {
    console.log(`Can't communicate with API, please review client id and secret`)
  }
})()
