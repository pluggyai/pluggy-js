import dotenv from 'dotenv'
import Pluggy from 'pluggy-js'
import { sleep, PLUGGY_BANK_CREDENTIALS, PLUGGY_BANK_CONNECTOR } from './utils'

dotenv.config()

const { PLUGGY_API_KEY: pluggyApiKey } = process.env
const baseClient = new Pluggy(pluggyApiKey)

void (async function(): Promise<void> {
  const { accessToken: connectToken } = await baseClient.createConnectToken()
  const client = new Pluggy(connectToken)

  // We create the sandbox item to review its data
  let item = await client.createItem(PLUGGY_BANK_CONNECTOR, PLUGGY_BANK_CREDENTIALS)
  while (!['LOGIN_ERROR', 'OUTDATED', 'UPDATED'].includes(item.status)) {
    await sleep(3000)
    item = await client.fetchItem(item.id)
  }

  console.log(`Item completed execution with status '${item.status}'`)
  if (['LOGIN_ERROR', 'OUTDATED'].includes(item.status)) return

  // Once the connection was done successfully, lets review its creditCards accounts
  const accounts = await client.fetchAccounts(item.id, 'CREDIT')
  console.log(accounts.results[0].creditData)
})()
