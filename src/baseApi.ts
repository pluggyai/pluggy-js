import axios, { AxiosInstance } from 'axios'

type QueryParameters = { [key: string]: number | number[] | string | string[] | boolean }

export class BaseApi {
  private service: AxiosInstance
  private apiKey: string
  private baseUrl: string

  constructor(accessToken: string, baseUrl = 'https://api.pluggy.ai') {
    if (!accessToken) {
      throw new Error('Missing authorization for API communication')
    }
    this.apiKey = accessToken
    this.baseUrl = baseUrl
  }

  getServiceInstance(): AxiosInstance {
    if (!this.service) {
      const config = {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      }
      this.service = axios.create(config)
    }
    return this.service
  }

  protected async createGetRequest<T>(endpoint: string, params?: QueryParameters): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}${this.mapToQueryString(params)}`

    return this.getServiceInstance()
      .get(url)
      .then(async response => {
        try {
          const { data, status } = response
          if (status !== 200) {
            return Promise.reject(data)
          } else {
            return Promise.resolve(data)
          }
        } catch {
          const { statusText } = response
          return Promise.reject({ statusText })
        }
      })
      .catch(error => {
        console.warn(`[API] HTTP request failed: ${error.message || ''}`, error)
        return Promise.reject(error)
      })
  }

  protected createPostRequest<T>(
    endpoint: string,
    params?: QueryParameters,
    body?: any
  ): Promise<T> {
    return this.createMutationRequest('post', endpoint, params, body)
  }

  protected createPutRequest<T>(
    endpoint: string,
    params?: QueryParameters,
    body?: any
  ): Promise<T> {
    return this.createMutationRequest('put', endpoint, params, body)
  }

  protected createPatchRequest<T>(
    endpoint: string,
    params?: QueryParameters,
    body?: any
  ): Promise<T> {
    return this.createMutationRequest('patch', endpoint, params, body)
  }

  protected createDeleteRequest<T>(
    endpoint: string,
    params?: QueryParameters,
    body?: any
  ): Promise<T> {
    return this.createMutationRequest('delete', endpoint, params, body)
  }

  protected async createMutationRequest<T>(
    method: string,
    endpoint: string,
    params?: QueryParameters,
    body?: any
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}${this.mapToQueryString(params)}`

    if (body) {
      Object.keys(body).forEach(key => (body[key] === undefined ? delete body[key] : {}))
    }
    return this.getServiceInstance()[method](url, body)
      .then(async response => {
        try {
          const { data, status } = response
          if (status !== 200) {
            return Promise.reject(data)
          } else {
            return Promise.resolve(data)
          }
        } catch {
          const { statusText } = response
          return Promise.reject({ statusText })
        }
      })
  }

  protected mapToQueryString(params: QueryParameters): string {
    if (!params || Object.keys(params).length === 0) {
      return ''
    }

    const query = Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null)
      .map(key => key + '=' + params[key])
      .join('&')
    return `?${query}`
  }
}
