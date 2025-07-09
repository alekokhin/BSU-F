import { del, get, post, put } from 'lib/request'
import { locales } from 'providers/locales'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export type SymbolType = {
  id: string
  title: string
  images: Array<any>
  newImages: Array<any>
  description: string
  connection: string
}
export type Symbols = Array<SymbolType>

// GET
export const getSymbols = async () =>
  get<Symbols>(`${REACT_APP_API_URL}${locales}/symbol/all`)

export const getSymbol = async (itemId: string) =>
  get<SymbolType>(`${REACT_APP_API_URL}${locales}/symbol/${itemId}`)

//POST
export const newSymbol = async (body: SymbolType) =>
  post(`${REACT_APP_API_URL}${locales}/symbol/add-symbol`, body, true)

//PUT
export const editSymbol = async (body: SymbolType) =>
  put(`${REACT_APP_API_URL}${locales}/symbol/edit-symbol/${body.id}`, body)

// DELETE
export const deleteSymbol = async (ItemId: string) =>
  del(`${REACT_APP_API_URL}${locales}/symbol/${ItemId}`)
