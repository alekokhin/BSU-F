import { globalAccessToken } from 'providers/auth'

type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export const request =
  (method: Method) =>
  async <T>(path: string, body?: Record<string, any>): Promise<T> => {
    const result = await fetch(path, {
      method,
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${globalAccessToken ?? ''}`,
      },
      body: JSON.stringify(body),
    })
    if (result.ok) {
      const data = await result.json()
      return data as T
    } else {
      const error = (await result.json()) as T
      return Promise.reject({
        ...error,
      }) as unknown as T
    }
  }

export const get = request('GET')
export const post = request('POST')
export const put = request('PUT')
export const patch = request('PATCH')
export const del = request('DELETE')
