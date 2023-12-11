import { del, get, post, put } from 'lib/request'
import { locales } from 'providers/locales'

export type AnalyzedTextType = {
  id: string
  title: string
  description: string
  connection: string
}

export type AnalyzedTexts = Array<AnalyzedTextType>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// GET AnalyzedText LIST
export const getAnalyzedTexts = async () =>
  get<AnalyzedTexts>(`${REACT_APP_API_URL}${locales}/analyzedText/all`)

// GET SINGLE AnalyzedText
export const getAnalyzedText = async (AnalyzedTextId: string) =>
  get<AnalyzedTextType>(
    `${REACT_APP_API_URL}${locales}/analyzedText/${AnalyzedTextId}`,
  )

// ADD NEW AnalyzedText
export const newAnalyzedText = async (body: AnalyzedTextType) =>
  post(`${REACT_APP_API_URL}${locales}/analyzedText/add-analyzedText`, body)

// UPDATE AnalyzedText
export const editAnalyzedText = async (body: AnalyzedTextType) =>
  put(
    `${REACT_APP_API_URL}${locales}/analyzedText/edit-analyzedText/${body.id}`,
    body,
  )

// DELETE AnalyzedText
export const deleteAnalyzedText = async (AnalyzedTextId: string) =>
  del(`${REACT_APP_API_URL}${locales}/analyzedText/${AnalyzedTextId}`)
