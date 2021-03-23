/**
 * @typedef TransactionFilters
 * @type {object}
 * @property {string} from - filter greater or equal than date. Format (ISO Date | yyyy-mm-dd)
 * @property {string} to - filter less or equal than date. Format (ISO Date | yyyy-mm-dd)
 * @property {number} pageSize - Amount of transactions to retrieve
 * @property {number} page - Page of transactions to retrieve, this calculates the offset.
 */
export type TransactionFilters = {
  to?: string
  from?: string
  pageSize?: number
  page?: number
}

/**
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
export type InvestmentType =
  | 'MUTUAL_FUND'
  | 'EQUITY'
  | 'SECURITY'
  | 'FIXED_INCOME'
  | 'ETF'
  | 'OTHER'

/**
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

/**
 * @typedef InvestmentStatus
 * @type {string}
 */
export type InvestmentStatus = 'ACTIVE' | 'PENDING' | 'TOTAL_WITHDRAWAL'

/**
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
  number: string | null
  balance: number
  name: string
  annualRate: number | null
  currencyCode: CurrencyCode
  date: Date | null
  value: number | null
  quantity: number | null
  taxes: number | null
  taxes2: number | null
  amountProfit: number | null
  amountWithdrawal: number | null

  lastMonthRate: number | null
  lastTwelveMonthsRate: number | null
  code: string | null
  amount: number | null
  owner: string | null
  amountOriginal: number | null
  dueDate: Date | null
  issuer: string | null
  issueDate: Date | null
  rate: number | null
  rateType: string | null
  status: InvestmentStatus | null
  transactions: InvestmentTransaction[] | null
}

export type InvestmentTransaction = {
  type: string
  quantity: number
  value: number
  amount: number
  date: Date
  tradeDate: Date | null
}

/**
 *
 * When requesting account data with a connectToken, only these fields are included in the response.
 *
 * @typedef AccountBase
 * @property {string} id - primary identifier of the account
 * @property {string} itemId - primary identifier of the Item
 * @property {AccountType} type - Type of the account
 * @property {AccountSubType} subtype - Sub type of the account
 * @property {string} number - Account's provider number
 * @property {number} balance - Current balance of the account
 * @property {string} name - Account's name or description
 * @property {CurrencyCode} currencyCode - ISO Currency code of the investment
 *
 */
export type AccountBase = {
  id: string
  itemId: string
  type: AccountType
  subtype: AccountSubType
  number: string
  balance: number
  name: string
  currencyCode: CurrencyCode
}

/**
 * @typedef Account
 * @type {object}
 * @property {string} id - primary identifier of the account
 * @property {string} itemId - primary identifier of the Item
 * @property {AccountType} type - Type of the account
 * @property {AccountSubType} subtype - Sub type of the account
 * @property {string} number - Account's provider number
 * @property {number} balance - Current balance of the account
 * @property {string} name - Account's name or description
 * @property {string} marketingName - Account's name provided by the institution based on the level of client.
 * @property {string} owner - Account's owner´s name
 * @property {string} taxNumber - Account's owner´s tax number
 * @property {BankData} bankData - Account related banking data
 * @property {CreditData} creditData - Account related credit data
 */
export type Account = AccountBase & {
  marketingName: string | null
  owner: string | null
  taxNumber: string | null
  bankData: BankData | null
  creditData: CreditData | null
}

/**
 * @typedef BankData
 * @type {object}
 * @property {string} transferNumber - primary identifier of the account to make bank transfers
 * @property {string} closingBalance - available balance of the account
 */
export type BankData = {
  transferNumber: string | null
  closingBalance: number | null
}

/**
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
  level: string | null
  brand: string | null
  balanceCloseDate: Date | null
  balanceDueDate: Date | null
  availableCreditLimit: number | null
  balanceForeignCurrency: number | null
  minimumPayment: number | null
  creditLimit: number | null
}

/**
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
  providerCode: string | null
}

/**
 * @typedef CredentialType
 * credential type, used to show a proper form input to the user
 *  'number' -> numeric only data
 *  'text' -> alpha-numeric data
 *  'password' -> alpha-numeric password, must be obfuscated
 *  'image' -> a QR code needs to be decoded (QR is provided in the credential.data field)
 *  'select' -> credential has to be picked from values listed in credential.options field
 */
export type CredentialType = 'number' | 'password' | 'text' | 'image' | 'select'

/**
 * @typedef CredentialSelectOption
 * @property {string} label - the text to display to the user for this option
 * @property {string} value - the actual value for this option
 */
export type CredentialSelectOption = {
  value: string
  label: string
}

/**
 * @typedef ConnectorCredential
 * @type {object}
 * @property {string} label - parameter label that describes it
 * @property {string} name - parameter key name
 * @property {CredentialType} type - type of parameter, used to create the form
 * @property {boolean} mfa - If parameter is used for MFA.
 * @property {string} data - Code for QR image to be resolved (credential type 'image')
 * @property {string} placeholder - Text to use for parameter placeholder in form
 * @property {string} validation - Validation regex to check on the submitted parameter value, before execution
 * @property {string} validationMessage - Validation error message to show to the user
 * @property {boolean} optional - Useful to allow the user to skip/ignoring an unneeded parameter
 * @property {string} assistiveText - Assistive information (supplied by the connector/site) to help the user provide the extra MFA credential
 * @property {CredentialSelectOption[]} options - Available options if credential is of type 'select'
 */
export type ConnectorCredential = {
  label: string
  name: string
  type?: CredentialType
  mfa?: boolean
  data?: string
  placeholder?: string
  validation?: string
  validationMessage?: string
  optional: boolean
  assistiveText?: string
  options?: CredentialSelectOption[]
}

/**
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
 * @property {boolean} hasMfa - if true, the connection will expect an MFA token credential. If a credential is "mfa: true", it will be requested on the same step (1-step MFA), otherwise it will be requested as an extra step (2-step MFA).
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
  hasMFA: boolean
  oauthUrl?: string
}

/**
 * @typedef Item
 * @type {object}
 * @property {number} id - primary identifier of the Item
 * @property {string} status - Current status of the item
 * @property {Connector} connector - Connector associated with item
 * @property {string} executionStatus - Current execution status of item.
 * @property {Date} createdAt - Date of the first connection
 * @property {Date} updatedAt - Date of the last update on the connection
 * @property {Date} lastUpdatedAt - Date of the last successful connection sync of the institution data.
 * @property {ConnectorCredential} parameter - Data of a MFA parameter second step, as it has been requested by
 *                                             the provider after successfully logging in, this will be
 *                                             needed to be able to proceed with the connection.
 */
export type Item = {
  id: string
  status: ItemStatus
  connector: Connector
  executionStatus: ExecutionStatus
  createdAt: Date
  updatedAt: Date
  lastUpdatedAt: Date | null
  parameter: ConnectorCredential | null
  error: ExecutionError | null
  webhookUrl: string | null
}

/**
 * All possible states for Execution.status
 */
export enum ExecutionStatus {
  CREATED = 'CREATED',
  CREATING = 'CREATING',
  CREATE_ERROR = 'CREATE_ERROR',
  LOGIN_MFA_IN_PROGRESS = 'LOGIN_MFA_IN_PROGRESS',
  LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS',
  WAITING_USER_INPUT = 'WAITING_USER_INPUT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ALREADY_LOGGED_IN = 'ALREADY_LOGGED_IN',
  INVALID_CREDENTIALS_MFA = 'INVALID_CREDENTIALS_MFA',
  SITE_NOT_AVAILABLE = 'SITE_NOT_AVAILABLE',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNTS_IN_PROGRESS = 'ACCOUNTS_IN_PROGRESS',
  CREDITCARDS_IN_PROGRESS = 'CREDITCARDS_IN_PROGRESS',
  TRANSACTIONS_IN_PROGRESS = 'TRANSACTIONS_IN_PROGRESS',
  INVESTMENTS_IN_PROGRESS = 'INVESTMENTS_IN_PROGRESS',
  IDENTITY_IN_PROGRESS = 'IDENTITY_IN_PROGRESS',
  MERGING = 'MERGING',
  MERGE_ERROR = 'MERGE_ERROR',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Parameters = Record<string, string>

export enum ExecutionErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_CREDENTIALS_MFA = 'INVALID_CREDENTIALS_MFA',
  ALREADY_LOGGED_IN = 'ALREADY_LOGGED_IN',
  SITE_NOT_AVAILABLE = 'SITE_NOT_AVAILABLE',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export enum ParameterValidationErrorCode {
  MISSING_REQUIRED_PARAMETER = '001',
  RULE_VALIDATION_ERROR = '002',
  DATE_RULE_VALIDATION_ERROR = '003',
}

export const FINISHED_STATUSES: ExecutionStatus[] = [
  ExecutionStatus.SUCCESS,
  ExecutionStatus.ERROR,
  ExecutionStatus.MERGE_ERROR,
  ExecutionStatus.INVALID_CREDENTIALS,
  ExecutionStatus.ALREADY_LOGGED_IN,
  ExecutionStatus.INVALID_CREDENTIALS_MFA,
  ExecutionStatus.SITE_NOT_AVAILABLE,
]

export type ParameterValidationError = {
  code: ParameterValidationErrorCode
  message: string
  parameter: string
}

export type ExecutionError = {
  code: ExecutionErrorCode
  message: string
}

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type ValidationErrorResponse = {
  code: HttpStatusCode
  message: string
  details?: ParameterValidationError[]
}

/**
 * Helper type-guard to check if create or update Item response is a
 * ValidationErrorResponse, or an actual Item.
 * @param response
 */
export function isValidationErrorResponse(
  response: Item | ValidationErrorResponse
): response is ValidationErrorResponse {
  return (
    (typeof (response as ValidationErrorResponse).code === 'number' &&
      typeof (response as ValidationErrorResponse).message === 'string') ||
    !(typeof (response as Item).id === 'string')
  )
}

export type PageResponse<T> = {
  results: T[]
}

export type TransactionsPageResponse = PageResponse<Transaction> & {
  page: number
  total: number
  totalPages: number
}

export enum ItemStatus {
  CREATING = 'CREATING',
  LOGIN_ERROR = 'LOGIN_ERROR',
  MERGING = 'MERGING',
  OUTDATED = 'OUTDATED',
  UPDATED = 'UPDATED',
  UPDATING = 'UPDATING',
  WAITING_USER_INPUT = 'WAITING_USER_INPUT',
}

export type ConnectorType = 'PERSONAL_BANK' | 'BUSINESS_BANK' | 'INVOICE' | 'INVESTMENT'

export type IdentityResponse = {
  id: string
  itemId: string
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
  createdAt: Date
  updatedAt: Date
}

export type PhoneNumber = {
  type?: 'Personal' | 'Work' | 'Residencial' | null
  value: string
}

export type Email = {
  type?: 'Personal' | 'Work'
  value: string
}

export type IdentityRelation = {
  type?: 'Mother' | 'Father' | 'Spouse' | null
  name?: string | null
  document?: string | null
}

export type Address = {
  fullAddress?: string | null
  primaryAddress?: string | null
  city?: string | null
  postalCode?: string | null
  state?: string | null
  country?: string | null
  type?: 'Personal' | 'Work' | null
}
