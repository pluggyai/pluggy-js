import { BaseApi } from './baseApi'
import {
  TransactionFilters,
  AccountType,
  InvestmentType,
  Category,
  Investment,
  Transaction,
  Account,
  Connector,
  ConnectorFilters,
  Item,
  PageResponse,
  IdentityResponse,
} from './types'

/**
 * Creates a new client instance for interacting with Pluggy API
 * @constructor
 * @param API_KEY for authenticating to the API
 * @returns {Pluggy} a client for making requests
 */
export default class Pluggy extends BaseApi {
  /**
   * Fetch all available connectors
   * @returns {Connector[]} an array of connectors
   */
  async fetchConnectors(options: ConnectorFilters = {}): Promise<PageResponse<Connector>> {
    return this.createGetRequest('connectors', { ...options })
  }

  /**
   * Fetch a single Connector
   * @param id The Connector ID
   * @returns {Connector} a connector object
   */
  async fetchConnector(id: number): Promise<Connector> {
    return this.createGetRequest(`connectors/${id}`)
  }

  /**
   * Fetch all items from the client
   * @returns {Item[]} list of connected items
   */
  async fetchItems(): Promise<PageResponse<Item>> {
    return this.createGetRequest(`items`)
  }

  /**
   * Fetch a single item
   * @param id The Item ID
   * @returns {Item} a item object
   */
  async fetchItem(id: string): Promise<Item> {
    return this.createGetRequest(`items/${id}`)
  }

  /**
   * Creates an item
   * @param connectorId The Connector's id
   * @param parameters A map of name and value for the needed credentials
   * @param webhookUrl - The webhookUrl to send item notifications to (optional)
   * @returns {Item} a item object
   */
  async createItem(
    connectorId: number,
    parameters: Record<string, string>,
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
   * @returns {Item} a item object
   */
  async updateItem(
    id: string,
    parameters?: Record<string, string>,
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
   */
  async updateItemMFA(id: string, parameters?: Record<string, string>): Promise<Item> {
    return this.createPostRequest(`items/${id}/mfa`, null, parameters)
  }

  /**
   * Deletes an item
   */
  async deleteItem(id: string): Promise<void> {
    return this.createDeleteRequest(`items/${id}`)
  }

  /**
   * Fetch accounts from an Item
   * @param itemId The Item id
   * @param type - AccountType filter (optional)
   * @returns {Account[]} an array of accounts
   */
  async fetchAccounts(itemId: string, type?: AccountType): Promise<PageResponse<Account>> {
    return this.createGetRequest('accounts', { itemId, type })
  }

  /**
   * Fetch a single account
   * @returns {Account} an account object
   */
  async fetchAccount(id: string): Promise<Account> {
    return this.createGetRequest(`accounts/${id}`)
  }

  /**
   * Fetch transactions from an account
   * @param accountId The account id
   * @param {TransactionFilters} options Transaction options to filter
   * @returns {Transaction[]} an array of transactions
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
   */
  async fetchTransaction(id: string): Promise<Transaction> {
    return this.createGetRequest(`transactions/${id}`)
  }

  /**
   * Fetch investments from an Item
   * @param itemId The Item id
   * @param type - InvestmentType filter (optional)
   * @returns {Investment[]} an array of investments
   */
  async fetchInvestments(itemId: string, type?: InvestmentType): Promise<PageResponse<Investment>> {
    return this.createGetRequest('investments', { itemId, type })
  }

  /**
   * Fetch a single investment
   * @returns {Investment} an investment object
   */
  async fetchInvestment(id: string): Promise<Investment> {
    return this.createGetRequest(`investments/${id}`)
  }

  /**
   * Fetch the identity resource
   * @returns {IdentityResponse} an identity object
   */
  async fetchIdentity(id: string): Promise<IdentityResponse> {
    return this.createGetRequest(`identity/${id}`)
  }

  /**
   * Fetch the identity resource by it's Item ID
   * @returns {IdentityResponse} an identity object
   */
  async fetchIdentityByItemId(itemId: string): Promise<IdentityResponse> {
    return this.createGetRequest(`identity?itemId=${itemId}`)
  }

  /**
   * Fetch all available categories
   * @returns {Categories[]} an paging response of categories
   */
  async fetchCategories(): Promise<PageResponse<Category>> {
    return this.createGetRequest('categories')
  }

  /**
   * Fetch a single category
   * @returns {Category} a category object
   */
  async fetchCategory(id: string): Promise<Category> {
    return this.createGetRequest(`categories/${id}`)
  }

  /**
   * Creates a connect token that can be used as API KEY to connect items from the Frontend
   * @returns {string} Access token to connect items with restrict access
   */
  async createConnectToken(): Promise<{ accessToken: string }> {
    return this.createPostRequest(`connectTokens`)
  }
}
