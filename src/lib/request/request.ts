/* eslint-disable no-console */
import { globalAccessToken } from 'providers/auth'

type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export const request =
  (method: Method) =>
  async <T>(
    path: string,
    body?: Record<string, any>,
    multipart?: boolean,
  ): Promise<T> => {
    const formData = new FormData()
    if (multipart) {
      // Inside the loop for multipart
      for (let key in body) {
        if (Array.isArray(body[key])) {
          for (const item of body[key]) {
            if (item instanceof File) {
              // Handle file differently
              formData.append(key, item, item.name)
            } else {
              formData.append(key, item)
            }
          }
        } else {
          if (body[key] instanceof File) {
            // Handle file differently
            formData.append(key, body[key], body[key].name)
          } else {
            formData.append(key, body[key])
          }
        }
      }
    }

    const headers: Record<string, string> = {
      authorization: `Bearer ${globalAccessToken ?? ''}`,
    }
    if (!multipart) {
      headers['Content-type'] = 'application/json'
    }
    console.log(headers)
    console.log(formData)
    console.log(body)
    let fet = multipart
      ? {
          method,
          headers,
          body: formData,
        }
      : {
          method,
          headers,
          body: JSON.stringify(body),
        }

    const result = await fetch(path, fet)
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
