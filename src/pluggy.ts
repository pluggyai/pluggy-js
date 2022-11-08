import { BaseApi } from './baseApi'
import {
  Account,
  AccountType,
  Category,
  Connector,
  ConnectorFilters,
  IdentityResponse,
  Investment,
  InvestmentType,
  Item,
  PageResponse,
  Transaction,
  TransactionFilters,
  Parameters,
  ListResponse,
  ConnectTokenOptions,
} from './types'

/**
 * Creates a new client instance for interacting with Pluggy API
 * @constructor
 * @param API_KEY for authenticating to the API
 * @returns {Pluggy} a client for making requests
 */
class Pluggy extends BaseApi {
  /**
   * Fetch all available connectors
   * @param connectorSearchFilters {ConnectorFilters} - GET /connectors search filtering options
   * @param includeHealth {boolean} - if 'true', connectors response will include 'health' field.
   *
   * @returns {ListResponse<Connector>} a list response of connectors
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchConnectors(
    connectorSearchFilters: ConnectorFilters = {},
    includeHealth = false
  ): Promise<ListResponse<Connector>> {
    return this.createGetRequest('connectors', {
      ...connectorSearchFilters,
      includeHealth,
    })
  }

  /**
   * Fetch a single Connector
   * @param id The Connector ID
   * @param includeHealth {boolean} - if 'true', connectors response will include 'health' field.
   *
   * @returns {Connector} a connector object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If specified Connector by 'id' does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchConnector(id: number, includeHealth = false): Promise<Connector> {
    return this.createGetRequest(`connectors/${id}`, { includeHealth })
  }

  /**
   * Fetch all items from the client
   * @returns {ListResponse<Item>} a list response of connected items
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchItems(): Promise<ListResponse<Item>> {
    return this.createGetRequest(`items`)
  }

  /**
   * Fetch a single item
   * @param id The Item ID
   * @returns {Item} a item object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If specified Item by 'id' does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchItem(id: string): Promise<Item> {
    return this.createGetRequest(`items/${id}`)
  }

  /**
   * Creates an item
   * @param connectorId The Connector's id
   * @param parameters A map of name and value for the needed credentials
   * @param webhookUrl - The webhookUrl to send item notifications to (optional)
   * @returns {Item} the created Item object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If connector is not found or accessible, status 403 if user is unauthorized
   * @throws {AxiosError<ValidationErrorResponse>} if 'connectorId' or 'webhookUrl' are invalid
   * @throws {AxiosError<ConnectorValidationErrorResponse>} if provided 'parameters' fail for some connector validation rules
   */
  async createItem(
    connectorId: number,
    parameters: Parameters,
    webhookUrl?: string
  ): Promise<Item> {
    return this.createPostRequest(`items`, null, {
      connectorId,
      parameters,
      webhookUrl,
    })
  }

  /**
   * Updates an item
   * @param id The Item ID
   * @param parameters A map of name and value for the credentials to be updated
   * @param webhookUrl - The new webhookUrl to send item notifications to (optional)
   * @returns {Item} the updated Item object
   *
   * @throws {AxiosError<ValidationErrorResponse>} if 'connectorId' or 'webhookUrl' are invalid
   * @throws {AxiosError<ConnectorValidationErrorResponse>} if provided 'parameters' fail for some connector validation rules
   * @throws {AxiosError<ErrorResponse>} status 404 If connector is not found or accessible,
   *                                     status 403 if user is unauthorized
   */
  async updateItem(
    id: string,
    parameters?: Parameters,
    webhookUrl?: string
  ): Promise<Item> {
    return this.createPatchRequest(`items/${id}`, null, {
      id,
      parameters,
      webhookUrl,
    })
  }

  /**
   * Send MFA for item execution
   * @param id The Item ID
   * @param parameters A map of name and value for the mfa requested
   * @returns {Item} a item object
   *
   * @throws {AxiosError<ValidationErrorResponse>} if item 'id' is invalid
   * @throws {AxiosError<ConnectorValidationErrorResponse>} if provided 'parameters' with the MFA value fail connector validation rules
   * @throws {AxiosError<ErrorResponse>} status 404 If item is not waiting an MFA request (or has already been fulfilled),
   *                                     status 403 if user is unauthorized
   */
  async updateItemMFA(id: string, parameters?: Parameters): Promise<Item> {
    return this.createPostRequest(`items/${id}/mfa`, null, parameters)
  }

  /**
   * Deletes an item
   *
   * @throws {AxiosError<ValidationErrorResponse>} if item 'id' is invalid
   * @throws {AxiosError<ErrorResponse>} status 404 If item does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async deleteItem(id: string): Promise<void> {
    return this.createDeleteRequest(`items/${id}`)
  }

  /**
   * Fetch accounts from an Item
   * @param itemId The Item id
   * @param type - AccountType filter (optional)
   * @returns {ListResponse<Account>} a list response of accounts
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchAccounts(
    itemId: string,
    type?: AccountType
  ): Promise<ListResponse<Account>> {
    return this.createGetRequest('accounts', { itemId, type })
  }

  /**
   * Fetch a single account
   * @returns {Account} an account object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If account does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchAccount(id: string): Promise<Account> {
    return this.createGetRequest(`accounts/${id}`)
  }

  /**
   * Fetch transactions from an account
   * @param accountId The account id
   * @param {TransactionFilters} options Transaction options to filter
   * @returns {PageResponse<Transaction>} object which contains the transactions list and related paging data
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchTransactions(
    accountId: string,
    options: TransactionFilters = {}
  ): Promise<PageResponse<Transaction>> {
    return this.createGetRequest('transactions', { ...options, accountId })
  }

  /**
   * Fetch a single transaction
   * @returns {Transaction} an transaction object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If transaction does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchTransaction(id: string): Promise<Transaction> {
    return this.createGetRequest(`transactions/${id}`)
  }

  /**
   * Fetch investments from an Item
   * @param itemId The Item id
   * @param type - InvestmentType filter (optional)
   * @returns {ListResponse<Investment>} a list response of investments
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchInvestments(
    itemId: string,
    type?: InvestmentType
  ): Promise<ListResponse<Investment>> {
    return this.createGetRequest('investments', { itemId, type })
  }

  /**
   * Fetch a single investment
   * @returns {Investment} an investment object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If transaction does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchInvestment(id: string): Promise<Investment> {
    return this.createGetRequest(`investments/${id}`)
  }

  /**
   * Fetch the identity resource
   * @returns {IdentityResponse} an identity object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If identity does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchIdentity(id: string): Promise<IdentityResponse> {
    return this.createGetRequest(`identity/${id}`)
  }

  /**
   * Fetch the identity resource by it's Item ID
   * @returns {IdentityResponse} an identity object
   *
   * @throws {AxiosError<ErrorResponse>} status 403 if user is unauthorized
   */
  async fetchIdentityByItemId(itemId: string): Promise<IdentityResponse> {
    return this.createGetRequest(`identity?itemId=${itemId}`)
  }

  /**
   * Fetch all available categories
   * @returns {ListResponse<Category>[]} an list response of categories
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If identity does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async fetchCategories(): Promise<ListResponse<Category>> {
    return this.createGetRequest('categories')
  }

  /**
   * Fetch a single category
   * @returns {Category} a category object
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If category does not exist
   *                                     status 403 if user is unauthorized
   */
  async fetchCategory(id: string): Promise<Category> {
    return this.createGetRequest(`categories/${id}`)
  }

  /**
   * Creates a connect token that can be used as API KEY to connect items from the Frontend
   * @param  {string} itemId - primary identifier of the Item
   * @param {ConnectTokenOptions} options - options object to create a connect token
   * @returns {string} Access token to connect items with restrict access
   *
   * @throws {AxiosError<ErrorResponse>} status 404 If specified Item by 'id' does not exist or is not accessible by the user,
   *                                     status 403 if user is unauthorized
   */
  async createConnectToken(itemId?: string, options?: ConnectTokenOptions): Promise<{ accessToken: string }> {
    return this.createPostRequest(`connect_token`, null, { itemId, options })
  }
}

export default Pluggy
