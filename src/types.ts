import axios, { AxiosError } from 'axios'

export const COUNTRY_CODES = ['AR', 'BR', 'CO', 'MX'] as const
/**
 * @typedef CountryCode
 *  Supported and available countries, in ISO-3166-1 alpha 2 format.
 *  Useful to filter connectors list.
 */
export type CountryCode = typeof COUNTRY_CODES[number]

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
 * @typedef ConnectTokenOptions
 * @type {object}
 * @property {string} clientUserId - Client's identifier for the user, it can be a ID, UUID or even an email.
 * @property {string} webhookUrl - Url to be notified of this specific item changes
 */
export type ConnectTokenOptions = {
  clientUserId?: string
  webhookUrl?: string
}

export const CURRENCY_CODES = ['USD', 'ARS', 'BRL'] as const
export type CurrencyCode = typeof CURRENCY_CODES[number]

export const ACCOUNT_TYPES = ['BANK', 'CREDIT'] as const
export type AccountType = typeof ACCOUNT_TYPES[number]

export const ACCOUNT_SUB_TYPES = [
  'SAVINGS_ACCOUNT',
  'CHECKINGS_ACCOUNT',
  'CREDIT_CARD',
] as const
export type AccountSubType = typeof ACCOUNT_SUB_TYPES[number]

export const INVESTMENT_TYPES = [
  'MUTUAL_FUND',
  'EQUITY',
  'SECURITY',
  'FIXED_INCOME',
  'ETF',
  'COE',
  'OTHER',
] as const
export type InvestmentType = typeof INVESTMENT_TYPES[number]

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

export const INVESTMENT_STATUSES = [
  'ACTIVE',
  'PENDING',
  'TOTAL_WITHDRAWAL',
] as const
/**
 * @typedef InvestmentStatus
 * @type {string}
 */
export type InvestmentStatus = typeof INVESTMENT_STATUSES[number]

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

export const CONNECTOR_TYPES = [
  'PERSONAL_BANK',
  'BUSINESS_BANK',
  'INVESTMENT',
] as const

/**
 * @typedef ConnectorType
 * Type of connectors available
 */
export type ConnectorType = typeof CONNECTOR_TYPES[number]

export const PRODUCT_TYPES = [
  'ACCOUNTS',
  'CREDIT_CARDS',
  'TRANSACTIONS',
  'PAYMENT_DATA',
  'INVESTMENTS',
  'INVESTMENTS_TRANSACTIONS',
  'IDENTITY',
  'BROKERAGE_NOTE',
  'OPPORTUNITIES',
] as const

export type ProductType = typeof PRODUCT_TYPES[number]

export const CREDENTIAL_TYPES = [
  'number',
  'password',
  'text',
  'image',
  'select',
] as const
/**
 * @typedef CredentialType
 * credential type, used to show a proper form input to the user
 *  'number' -> numeric only data
 *  'text' -> alpha-numeric data
 *  'password' -> alpha-numeric password, must be obfuscated
 *  'image' -> a QR code needs to be decoded (QR is provided in the credential.data field)
 *  'select' -> credential has to be picked from values listed in credential.options field
 */
export type CredentialType = typeof CREDENTIAL_TYPES[number]

export type CredentialSelectOption = {
  /** Value of the option */
  value: string
  /** Displayable text or label of the option */
  label: string
}

export type ConnectorCredential = {
  /** parameter label that describes it */
  label: string
  /** parameter key name */
  name: string
  /** type of parameter to create the form */
  type?: CredentialType
  /** If parameter is used for MFA. */
  mfa?: boolean
  /** If parameter is image, base64 string is provided */
  data?: string
  /** Assistive information to help the user provide us the credential */
  assistiveText?: string
  /** Available options if credential is of type 'select' */
  options?: CredentialSelectOption[]
  /** Regex to validate input */
  validation?: string
  /** Error message of input validation on institution language */
  validationMessage?: string
  /** Input's placeholder for help */
  placeholder?: string
  /** Is this credential optional? */
  optional?: boolean
  /** Applies to MFA credential only - Detailed information that includes details/hints that the user should be aware of */
  instructions?: string
  /** Parameter expiration date, input value should be submitted before this date. */
  expiresAt?: Date
}

export type Connector = {
  /** Primary identifier of the connector */
  id: number
  /** Financial institution name */
  name: string
  /** Url of the institution that the connector represents */
  institutionUrl: string
  /** Image url of the institution. */
  imageUrl: string
  /** Primary color of the institution */
  primaryColor: string
  /** Type of the connector */
  type: ConnectorType
  /** Country of the institution */
  country: string
  /** List of parameters needed to execute the connector */
  credentials: ConnectorCredential[]
  /** Has MFA steps */
  hasMFA: boolean
  /** (only for OAuth connector) this URL is used to connect the user and on success it will redirect to create the new item */
  oauthUrl?: string
  /** object with information that descirbes current state of the institution connector
   * ONLINE - the connector is working as expected
   * OFFLINE - the connector is not currently available (API will refuse all connections with 400 status error)
   * UNSTABLE - the connector is working but with degraded performance
   */
  health?: {
    status: 'ONLINE' | 'OFFLINE' | 'UNSTABLE'
    stage: 'BETA' | null
  }
  /** list of products supported by the institution */
  products: ProductType[]
  /** Connector creation date */
  createdAt: Date
}

export type ConnectorFilters = {
  /** Connector´s name or alike name */
  name?: string
  /** list of countries to filter available connectors */
  countries?: string[]
  /** list of types to filter available connectors */
  types?: ConnectorType[]
  /** recovers sandbox connectors. Default: false */
  sandbox?: boolean
}

/**
 * The Item Create/Update parameters object to submit, which contains the needed user credentials.
 */
export type Parameters = Record<string, string>

export type TriggeredBy = 'CLIENT' | 'USER' | 'SYNC' | 'INTERNAL'

const CONNECTOR_EXECUTION_STATUSES = [
  'LOGIN_IN_PROGRESS',
  'WAITING_USER_INPUT',
  'LOGIN_MFA_IN_PROGRESS',
  'ACCOUNTS_IN_PROGRESS',
  'TRANSACTIONS_IN_PROGRESS',
  'PAYMENT_DATA_IN_PROGRESS',
  'CREDITCARDS_IN_PROGRESS',
  'INVESTMENTS_IN_PROGRESS',
  'INVESTMENTS_TRANSACTIONS_IN_PROGRESS',
  'OPPORTUNITIES_IN_PROGRESS',
  'IDENTITY_IN_PROGRESS',
  'PORTFOLIO_IN_PROGRESS'
] as const

export type ConnectorExecutionStatus = typeof CONNECTOR_EXECUTION_STATUSES[number]

const EXECUTION_ERROR_CODES = [
  'INVALID_CREDENTIALS',
  'ACCOUNT_CREDENTIALS_RESET',
  'ALREADY_LOGGED_IN',
  'UNEXPECTED_ERROR',
  'INVALID_CREDENTIALS_MFA',
  'SITE_NOT_AVAILABLE',
  'ACCOUNT_LOCKED',
  'CONNECTION_ERROR',
  'ACCOUNT_NEEDS_ACTION',
  'USER_AUTHORIZATION_PENDING',
  'USER_AUTHORIZATION_NOT_GRANTED',
  'USER_INPUT_TIMEOUT',
] as const

export type ExecutionErrorCode = typeof EXECUTION_ERROR_CODES[number]

export const EXECUTION_FINISHED_STATUSES = [
  ...EXECUTION_ERROR_CODES,
  'MERGE_ERROR',
  'ERROR',
  'SUCCESS',
  'PARTIAL_SUCCESS',
] as const

export type ExecutionFinishedStatus = typeof EXECUTION_FINISHED_STATUSES[number]

const EXECUTION_STATUSES = [
  'CREATING',
  'CREATE_ERROR',
  'CREATED',
  ...CONNECTOR_EXECUTION_STATUSES,
  ...EXECUTION_FINISHED_STATUSES,
] as const

export type ExecutionStatus = typeof EXECUTION_STATUSES[number]

export type ExecutionErrorResultMetadata = {
  /** a provider id to relate the execution with an item, for example 'user_id'. useful to match webhook notifications with items */
  providerId?: string
  /** if the connector is MFA, this indicates if MFA credentials are required or not to continue the current execution */
  hasMFA?: boolean
  /** Credentials to be used in future executions. May differ or expand from the current execution credentials */
  credentials?: Record<string, string>
  /** Device nickname used when device authorization is pending */
  deviceNickname?: string
}

export type ExecutionErrorResult = {
  /** The specific execution error code */
  code: ExecutionErrorCode
  /** A human-readable, short description of the error */
  message: string
  /** The exact error message returned by the institution, if any was provided. */
  providerMessage?: string
  /** Only used in Caixa Connector, for the device authorization flow */
  metadata?: ExecutionErrorResultMetadata
  /** Unstructured properties that provide additional context/information of the error.
   * Used for some specific cases only, such as Caixa PF & PJ.
   * @see https://docs.pluggy.ai/docs/errors-validations for more info. */
  attributes?: Record<string, string>
}

const ITEM_STATUSES = [
  'UPDATED',
  'UPDATING',
  'WAITING_USER_INPUT',
  'LOGIN_ERROR',
  'OUTDATED',
] as const

/**
 * The current Item status.
 *  UPDATED: The last sync process has completed successfully and all new data is available to collect.
 *  UPDATING: An update process is in progress and will be updated soon.
 *  WAITING_USER_INPUT: The connection requires user's input to continue the sync process, this is common for MFA authentication connectors
 *  LOGIN_ERROR: The connection must be updated to execute again, it won't trigger updates until the parameters are updated.
 *  OUTDATED: The parameters were correctly validated but there was an error in the last execution. It can be retried.
 */
export type ItemStatus = typeof ITEM_STATUSES[number]

export type ItemProductState = {
  /** Whether product was collected in this last execution or not */
  isUpdated: boolean
  /** Date when product was last collected for this Item, null if it has never been. */
  lastUpdatedAt: Date | null
}

/**
 * Only available when item.status is 'PARTIAL_SUCCESS'.
 * Provides fine-grained information, per product, about their latest collection state.
 *
 * If a product was not requested at all, its entry will be null.
 * If it was requested, it's entry will reflect if it has been collected or not.
 *  If collected, isUpdated will be true, and lastUpdatedAt will be the Date when it happened
 *  If not collected, isUpdated will be false, and lastUpdatedAt will be null it wasn't ever collected before, or the previous date if it was.
 */
export type ItemProductsStatusDetail = {
  /** Collection details for 'ACCOUNTS' product, or null if it was not requested at all. */
  accounts: ItemProductState | null
  /** Collection details for 'CREDIT_CARDS' product, or null if it was not requested at all. */
  creditCards: ItemProductState | null
  /** Collection details for account 'TRANSACTIONS' product, or null if it was not requested at all. */
  transactions: ItemProductState | null
  /** Collection details for 'INVESTMENTS' product, or null if it was not requested at all. */
  investments: ItemProductState | null
  /** Collection details for 'IDENTITY' product, or null if it was not requested at all. */
  identity: ItemProductState | null
  /** Collection details for 'PAYMENT_DATA' product, or null if it was not requested at all. */
  paymentData: ItemProductState | null
}

export type Item = {
  /** primary identifier of the Item */
  id: string
  /** Connector's associated with item */
  connector: Connector
  /** Current status of the item */
  status: ItemStatus
  /** If status is 'PARTIAL_SUCCESS', this field will provide more detailed info about which products have been recovered or failed. */
  statusDetail: ItemProductsStatusDetail | null
  /** Item error details, if finished in an error status */
  error: ExecutionErrorResult | null
  /** Current execution status of item. */
  executionStatus: ExecutionStatus
  /** Date of the first connection */
  createdAt: Date
  /** Date of last item related data update */
  updatedAt: Date
  /** Last connection sync date with the institution. */
  lastUpdatedAt: Date | null
  /** In case of MFA connections, extra parameter will be available. */
  parameter: ConnectorCredential | null
  /** Url where notifications will be sent at any item's event */
  webhookUrl: string | null
  /** A unique identifier for the User, to be able to identify it on your app */
  clientUserId: string | null
}

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * General Pluggy API error response
 */
export type ErrorResponse = {
  code: HttpStatusCode
  message: string
}

/**
 * Representation of a Client-side error, such as a network connectivity issue
 */
export type NoServerResponseError = {
  code: '0'
  message: string
}

export enum ParameterValidationErrorCode {
  MISSING_REQUIRED_PARAMETER = '001',
  RULE_VALIDATION_ERROR = '002',
  DATE_RULE_VALIDATION_ERROR = '003',
}

export type ParameterValidationError = {
  code: ParameterValidationErrorCode
  message: string
  parameter: string
}

/**
 * 400 Bad Request error, usually due to
 * invalid or missing query/body parameters on a request.
 *
 * If the API can determine a related connector parameter error, it will be included
 * in the 'details' field.
 */
export type ValidationErrorResponse = ErrorResponse & {
  code: HttpStatusCode.BAD_REQUEST
  details?: ParameterValidationError[]
}

/**
 * 400 Bad Request error, due to invalid or missing connector parameters
 * on an Item create/update request.
 *
 * The 'details' array includes all affected parameters that failed with a more specific message.
 */
export type ConnectorValidationErrorResponse = ErrorResponse & {
  code: HttpStatusCode.BAD_REQUEST
  details: ParameterValidationError[]
}

/**
 * Helper type-guard to to narrow an Error to an AxiosError containing ConnectorValidationErrorResponse.
 * This error response can happen on a Bad Request on 'POST /items' and 'PATCH /items' requests.
 * @param error
 */
export function isConnectorValidationErrorResponse(
  error: Error
): error is AxiosError<ConnectorValidationErrorResponse> {
  if (!axios.isAxiosError(error)) {
    return false
  }
  const { response } = error
  if (!response) {
    return false
  }
  const {
    data: { code, message, details },
  } = response as {
    data: { code: unknown; message: unknown; details: unknown }
  }

  return (
    code === HttpStatusCode.BAD_REQUEST &&
    typeof message === 'string' &&
    Array.isArray(details)
  )
}

/**
 * Helper guard to narrow an Error to an AxiosError containing a
 * Pluggy API ValidationErrorResponse object (which represents a 400 Bad Request).
 *
 * This error response can happen on a bad request on any resource, for example when some
 * required parameters are missing or have an invalid format or value.
 *
 * @param error
 */
export function isValidationErrorResponse(
  error: Error
): error is AxiosError<ValidationErrorResponse> {
  if (!axios.isAxiosError(error)) {
    return false
  }
  const { response } = error
  if (!response) {
    return false
  }
  const {
    data: { code, message },
  } = response as {
    data: { code: unknown; message: unknown }
  }

  return code === HttpStatusCode.BAD_REQUEST && typeof message === 'string'
}

/**
 * Helper guard to narrow an Error to an AxiosError containing a Pluggy API ErrorResponse object.
 * @param error
 */
export function isPluggyServerError(
  error: Error
): error is AxiosError<ErrorResponse> {
  if (!axios.isAxiosError(error)) {
    return false
  }
  const { response, code } = error
  if (!response) {
    return false
  }
  if (Number(code) >= 200 && Number(code) < 300) {
    // Response code is OK -> not an error
    return false
  }
  return true
}

/**
 * Helper to extract the ErrorResponse data object
 * from the AxiosError<ErrorResponse> error
 */
export function getErrorResponse<ErrorResponse>(
  error: AxiosError<ErrorResponse>
): ErrorResponse {
  if (!error.response) {
    throw new Error(
      `Response is undefined in AxiosError object, can't extract data`
    )
  }
  return error.response.data
}

/**
 * Helper guard to narrow an Error to an AxiosError that is related to the client, not to the server.
 * @param error
 */
export function isClientError(error: Error): error is AxiosError<unknown> {
  if (!axios.isAxiosError(error)) {
    return false
  }

  const { request, response } = error

  if (request === undefined && response === undefined) {
    // Something happened in setting up the request that triggered an Error
    return true
  }

  if (response === undefined) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return true
  }

  return false
}

/**
 * Helper to create a NoServerResponseError object
 * from an error that is an AxiosError related to the client itself.
 */
export function parseClientError(
  error: AxiosError<unknown>
): NoServerResponseError {
  if (!axios.isAxiosError(error)) {
    throw new Error('Error is not an AxiosError instance')
  }

  if (!isClientError(error)) {
    throw new Error('AxiosError is a server response error, not a client error')
  }

  const { request, response, message } = error

  if (request === undefined && response === undefined) {
    // Something happened in setting up the request that triggered an Error
    return {
      code: '0',
      message: `Malformed request error: '${message}'`,
    }
  }

  if (response === undefined) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Request was made but no response was received', request)
    return {
      code: '0',
      message: `Request was made but no response from server was received`,
    }
  }
  // other - this should not happen (should already have covered all previous scenarios)
  return {
    code: '0',
    message: `Unexpected AxiosError client error`,
  }
}

export type ListResponse<T> = {
  results: T[]
}

export type PageResponse<T> = ListResponse<T> & {
  page: number
  total: number
  totalPages: number
}

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
