import { locales } from 'components/header'
import { del, get, post, put } from 'lib/request'

export type String = {
  id: string
  title: string
  images: Array<any>
  description: string
  connection: string
}

export type Strings = Array<String>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// export type StringResponse = { Strings: Strings }

// GET String LIST
export const getStrings = async () =>
  get<Strings>(`${REACT_APP_API_URL}${locales}/string/all`)

// GET SINGLE String
export const getString = async (StringId: string) =>
  get<String>(`${REACT_APP_API_URL}${locales}/string/${StringId}`)

// ADD NEW String
export const newString = async (body: String) =>
  post(`${REACT_APP_API_URL}${locales}/string/add-string`, body)

// UPDATE String
export const editString = async (body: String) =>
  put(`${REACT_APP_API_URL}${locales}/string/edit-string/${body.id}`, body)

// DELETE String
export const deleteString = async (StringId: string) =>
  del(`${REACT_APP_API_URL}${locales}/string/${StringId}`)
