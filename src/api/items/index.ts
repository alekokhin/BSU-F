import { del, get, post, put } from '../../lib/request'

type WordDescription = {
  word: string
  description: {
    field1: string
    field2: string
    field3: string
    field4: string
    field5: string
    field6: string
    field7: string
  }
}
export type Item = {
  id: string
  title: string
  description: string
  images: Array<string>
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
  words: Array<WordDescription>
}

export type Items = Array<Item>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// export type ItemResponse = { Items: Items }

// GET Item LIST
export const getItems = async () => get<Items>(`${REACT_APP_API_URL}item/all`)

// GET SINGLE Item
export const getItem = async (itemId: string) =>
  get<Item>(`${REACT_APP_API_URL}item/${itemId}`)

// ADD NEW Item
export const createItem = async (body: Item) =>
  post(`${REACT_APP_API_URL}item/add-item`, body)

// UPDATE Item
export const editItem = async (body: Item) =>
  put(`${REACT_APP_API_URL}item/edit-item/${body.id}`, body)

// DELETE Item
export const deleteItem = async (ItemId: string) =>
  del(`${REACT_APP_API_URL}item/${ItemId}`)
