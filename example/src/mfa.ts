import dotenv from 'dotenv'
import Pluggy from 'pluggy-js'
import { ItemStatus } from 'pluggy-js'
import { sleep, PLUGGY_BANK_CREDENTIALS, PLUGGY_BANK_CONNECTOR } from './utils'

const DEFAULT_MFA_VALUE = '123456'

dotenv.config()

const { PLUGGY_API_KEY: pluggyApiKey } = process.env
const baseClient = new Pluggy(pluggyApiKey)

void (async function(): Promise<void> {
  const { accessToken: connectToken } = await baseClient.createConnectToken()
  const client = new Pluggy(connectToken)

  // Create a connection
  let item = await client.createItem(PLUGGY_BANK_CONNECTOR, {
    ...PLUGGY_BANK_CREDENTIALS,
    user: 'user-mfa',
  })

  while (![ItemStatus.LOGIN_ERROR, ItemStatus.OUTDATED, ItemStatus.UPDATED].includes(item.status)) {
    console.log(`Item ${item.id} its syncing with the institution, current status ${item.status}`)
    await sleep(3000)
    item = await client.fetchItem(item.id)
    if (item.status === ItemStatus.WAITING_USER_INPUT) {
      const { parameter } = item
      console.log(`There is a MFA requested, ${parameter.name}, providing value.`)
      try {
        item = await client.updateItemMFA(item.id, {
          [parameter.name]: DEFAULT_MFA_VALUE,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  console.log(`Item completed execution with status ${item.status}`)

  console.log(`Deleting retrieved data for item #${item.id}`)
  await client.deleteItem(item.id)
  console.log(`Item deleted succesfully`)
})()
