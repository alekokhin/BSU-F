import { del, get, post, put } from 'lib/request'
import { locales } from 'providers/locales'

export type StringType = {
  id: string
  title: string
  images: Array<any>
  newImages: Array<any>
  description: string
  connection: string
}

export type Strings = Array<StringType>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// export type StringResponse = { Strings: Strings }

// GET String LIST
export const getStrings = async () =>
  get<Strings>(`${REACT_APP_API_URL}${locales}/string/all`)

// GET SINGLE String
export const getString = async (StringId: string) =>
  get<StringType>(`${REACT_APP_API_URL}${locales}/string/${StringId}`)

// ADD NEW String
export const newString = async (body: StringType) =>
  post(`${REACT_APP_API_URL}${locales}/string/add-string`, body, true)

// UPDATE String
export const editString = async (body: StringType) =>
  put(`${REACT_APP_API_URL}${locales}/string/edit-string/${body.id}`, body)

// DELETE String
export const deleteString = async (StringId: string) =>
  del(`${REACT_APP_API_URL}${locales}/string/${StringId}`)
