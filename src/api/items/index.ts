import { del, get, post, put } from 'lib/request'
import { locales } from 'providers/locales'

export type ItemType = {
  id: string
  title: string
  description: string
  images: Array<any>
  security: string
  damaged: string
  color: string
  structure: string
  reWriteDate: string
  reWritePlace: string
  paperCount: string
  size: string
  countOfColumns: string
  countOfRow: string
  typeOfPagination: string
  transcriber: string
  belonging: string
  firstAndLast: string
  will: string
}
export type Image = {
  image: string
}

export type Items = Array<ItemType>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// GET Item LIST
export const getItems = async () =>
  get<Items>(`${REACT_APP_API_URL}${locales}/item/all`)

// GET SINGLE Item
export const getItem = async (itemId: string) =>
  get<ItemType>(`${REACT_APP_API_URL}${locales}/item/${itemId}`)

// ADD NEW Item
export const newItem = async (body: ItemType) =>
  post(`${REACT_APP_API_URL}${locales}/item/add-item`, body, true)

// UPDATE Item
export const editItem = async (body: ItemType) =>
  put(`${REACT_APP_API_URL}${locales}/item/edit-item/${body.id}`, body, true)

// DELETE Item
export const deleteItem = async (ItemId: string) =>
  del(`${REACT_APP_API_URL}${locales}/item/${ItemId}`)
