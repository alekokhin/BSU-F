import { locales } from 'components/header'
import { get, post, put } from 'lib/request'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export type Symbol = {
  id: string
  title: string
  images: Array<any>
  description: string
  connection: string
}
export type Symbols = Array<Symbol>

// GET
export const getSymbols = async () =>
  get<Symbols>(`${REACT_APP_API_URL}${locales}/symbol/all`)

export const getSymbol = async (itemId: string) =>
  get<Symbol>(`${REACT_APP_API_URL}${locales}/symbol/${itemId}`)

//POST
export const newSymbol = async (body: Symbol) =>
  post(`${REACT_APP_API_URL}${locales}/symbol/add-symbol`, body)

//PUT
export const editSymbol = async (body: Symbol) =>
  put(`${REACT_APP_API_URL}${locales}/symbol/edit-symbol/${body.id}`, body)
