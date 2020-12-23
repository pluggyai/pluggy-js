/*
 * @typedef TransactionFilters
 * @type {object}
 * @property {string} from - filter greater than date. Format (ISO Date | yyyy-mm-dd)
 * @property {string} to - filter greater than date. Format (ISO Date | yyyy-mm-dd)
 * @property {number} pageSize - Amount of transactions to retrieve
 * @property {number} page - Page of transactions to retrieve, this calculates the offset.
 */
export type TransactionFilters = {
  to?: string
  from?: string
  pageSize?: number
  page?: number
}

/*
 * @typedef ConnectorFilters
 * @type {object}
 * @property {string} name - Connector´s name or alike name
 * @property {string[]} countries - list of countries to filter available connectors
 * @property {string[]} types - list of types to filter available connectors
 * @property {boolean} sandbox - recovers sandbox connectors. Default: false
 */
export type ConnectorFilters = {
  name?: string
  countries?: string[]
  types?: string[]
  sandbox?: boolean
}

export type CurrencyCode = 'USD' | 'ARS' | 'BRL'
export type AccountType = 'BANK' | 'CREDIT'
export type AccountSubType = 'SAVINGS_ACCOUNT' | 'CHECKINGS_ACCOUNT' | 'CREDIT_CARD'
export type InvestmentType = 'MUTUAL_FUND' | 'SECURITY' | 'EQUITY'
/*
 * @typedef Category
 * @type {object}
 * @property {string} id - primary identifier of the category
 * @property {string} description - Category's name or description.
 * @property {string} parentId - Parent category hierachy primary identifier
 * @property {string} parentDescription - Parent category hierachy name or description
 */
export type Category = {
  id: string
  description: string
  parentId?: string
  parentDescription?: string
}

/*
 * @typedef Investment
 * @type {object}
 * @property {string} id - primary identifier of the investment
 * @property {string} itemId - primary identifier of the Item
 * @property {string} name - Investment description
 * @property {string} number - Identifier from the institution for the investment.
 * @property {number} balance - Current balance of the investment
 * @property {number} annualRate - Annual rate of the investment
 * @property {Date} date - Quota's date
 * @property {number} value - Quota's value at date
 * @property {number} quantity - Quota's quantity at date
 * @property {number} taxes - Taxes of investment attached to the investment
 * @property {number} taxes2 - Taxes of investment attached to owner.
 * @property {number} amountProfit - Amount gained from the investment
 * @property {number} amountWithdrawal - Amount available for withdrawal
 * @property {CurrencyCode} currencyCode - ISO Currency code of the investment
 * @property {InvestmentType} type - Type of the investment
 */
export type Investment = {
  id: string
  itemId: string
  type: InvestmentType
  number: string
  balance: number
  name: string
  annualRate?: number
  currencyCode: CurrencyCode
  date?: Date
  value?: number
  quantity?: number
  taxes?: number
  taxes2?: number
  amountWithdrawal?: number
  amountProfit?: number
}

/*
 * @typedef Account
 * @type {object}
 * @property {string} id - primary identifier of the account
 * @property {string} itemId - primary identifier of the Item
 * @property {string} name - Account's name or description
 * @property {string} marketingName - Account's name provided by the institution based on the level of client.
 * @property {string} number - Account's provider number
 * @property {number} balance - Current balance of the account
 * @property {string} owner - Account's owner´s name
 * @property {string} taxNumber - Account's owner´s tax number
 * @property {CurrencyCode} currencyCode - ISO Currency code of the investment
 * @property {AccountType} type - Type of the account
 * @property {AccountSubType} subtype - Sub type of the account
 */
export type Account = {
  id: string
  itemId: string
  type: AccountType
  subtype: AccountSubType
  number: string
  balance: number
  name: string
  marketingName?: string
  owner?: string
  taxNumber?: string
  currencyCode: CurrencyCode
  bankData?: BankData
  creditData?: CreditData
}

/*
 * @typedef BankData
 * @type {object}
 * @property {string} transferNumber - primary identifier of the account to make bank transfers
 * @property {string} closingBalance - available balance of the account
 */
export type BankData = {
  transferNumber?: string
  closingBalance?: number
}

/*
 * @typedef CreditData
 * @type {object}
 * @property {string} level - Credit card client's level
 * @property {string} brand - Credit card brand
 * @property {Date} balanceCloseDate - Current balance close date
 * @property {Date} balanceDueDate - Current balance due date
 * @property {number} minimumPayment - Current balance minimum payment due
 * @property {number} balanceForeignCurrency - Current balance in foreign currency
 * @property {number} availableCreditLimit - Available credit limit to use.
 */
export type CreditData = {
  level?: string
  brand?: string
  balanceCloseDate?: Date
  balanceDueDate?: Date
  availableCreditLimit?: number
  balanceForeignCurrency?: number
  minimumPayment?: number
}

/*
 * @typedef Transaction
 * @type {object}
 * @property {string} id - primary identifier of the transaction
 * @property {string} accountId - primary identifier of the Account
 * @property {string} description - Transaction original description
 * @property {Date} date - Date of the transaction that was made.
 * @property {number} amount - Amount of the transaction
 * @property {number} balance - Current balance of the trasaction, after transaction was made.
 * @property {CurrencyCode} currencyCode - ISO Currency code of the Transaction
 */
export type Transaction = {
  id: string
  accountId: string
  date: Date
  description: string
  amount: number
  balance: number
  currencyCode: CurrencyCode
  providerCode?: string
}

/*
 * @typedef ConnectorCredential
 * @type {object}
 * @property {string} label - parameter label that describes it
 * @property {string} name - parameter key name
 * @property {CredentialType} type - type of parameter, used to create the form
 * @property {boolean} mfa - If parameter is used for MFA.
 * @property {string} placeholder - Text to use for parameter placeholder in form
 * @property {string} validation - Validation regex to check on the submitted parameter value, before execution
 * @property {string} validationMessage - Validation error message to show to the user
 * @property {boolean} optional - Useful to allow the user to skip/ignoring an unneeded parameter
 */
export type ConnectorCredential = {
  label: string
  name: string
  type?: CredentialType
  mfa?: boolean
  placeholder?: string
  validation?: string
  validationMessage?: string
  optional: boolean
}

/*
 *  @typedef ConnectorCredential
 * credential type, used to show a proper form input to the user
 * 'number' -> numeric only data
 * 'text' -> alpha-numeric data
 * 'password' -> alpha-numeric password, must be obfuscated
 */
export type CredentialType = 'number' | 'password' | 'text'

/*
 * @typedef Connector
 * @type {object}
 * @property {number} id - primary identifier of the connector
 * @property {string} name - Connector's institution name
 * @property {string} institutionUrl - Url of the institution that the connector represents
 * @property {string} imageUrl - Image url of the institution.
 * @property {string} primaryColor - Primary color of the institution
 * @property {string} country - Country of the institution
 * @property {string} type - Type of the connector
 * @property {ConnectorCredential[]} credentials - List of parameters needed to execute the connector
 * @property {string} oauthUrl - (only for OAuth connector) this URL is used to connect the user and on success it will redirect to create the new item
 */
export type Connector = {
  id: number
  name: string
  institutionUrl: string
  imageUrl: string
  primaryColor: string | null
  type: ConnectorType
  country: string
  credentials: ConnectorCredential[]
  oauthUrl?: string
}

/*
 * @typedef Item
 * @type {object}
 * @property {number} id - primary identifier of the Item
 * @property {Connector} connector - Connector's associated with item
 * @property {string} status - Current status of the item
 * @property {string} executionStatus - Current execution status of item.
 * @property {Date} createdAt - Date of the first connection
 * @property {Date} lastUpdatedAt - Last connection sync date with the institution.
 */
export type Item = {
  id: string
  connector: Connector
  status: ItemStatus
  executionStatus: string
  createdAt: Date
  lastUpdatedAt?: Date
  parameter?: ConnectorCredential | null
  error?: ErrorResponse
}

export type ErrorResponse = {
  code: number
  message: string
}

export type PageResponse<T> = {
  results: T[]
}

export enum ItemStatus {
  LOGIN_ERROR = 'LOGIN_ERROR',
  OUTDATED = 'OUTDATED',
  UPDATED = 'UPDATED',
  UPDATING = 'UPDATING',
  WAITING_USER_INPUT = 'WAITING_USER_INPUT',
}

export type ConnectorType = 'PERSONAL_BANK' | 'BUSINESS_BANK' | 'INVOICE' | 'INVESTMENT'

export type IdentityResponse = {
  id: string
  birthDate?: Date
  taxNumber?: string
  document?: string
  documentType?: string
  jobTitle?: string
  fullName?: string
  phoneNumbers?: PhoneNumber[]
  emails?: Email[]
  addresses?: Address[]
  relations?: IdentityRelation[]
}

export type PhoneNumber = {
  type?: 'Personal' | 'Work' | 'Residencial'
  value: string
}

export type Email = {
  type?: 'Personal' | 'Work'
  value: string
}

export type IdentityRelation = {
  type?: 'Mother' | 'Father' | 'Spouse'
  name?: string
  document?: string
}

export type Address = {
  fullAddress?: string
  primaryAddress?: string
  city?: string
  postalCode?: string
  state?: string
  country?: string
  type?: 'Personal' | 'Work'
}
