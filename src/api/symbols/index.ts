import { get, post, put } from 'lib/request'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export type Symbol = {
  id: string
  title: string
  description: string
  images: Array<any>
}
export type Symbols = Array<Symbol>

// GET
export const getSymbols = async () =>
  get<Symbols>(`${REACT_APP_API_URL}item/all`)

export const getSymbol = async (itemId: string) =>
  get<Symbol>(`${REACT_APP_API_URL}item/${itemId}`)

//POST
export const newSymbol = async (body: Symbol) =>
  post(`${REACT_APP_API_URL}item/add-item`, body)

//PUT
export const editSymbol = async (body: Symbol) =>
  put(`${REACT_APP_API_URL}item/edit-item/${body.id}`, body)
