import { locales } from 'components/header'
import { del, get, post, put } from 'lib/request/request'

export type word = {
  id: string
  rame1: string
  rame2: string
  rame3: string
  rame4: string
  rame5: string
  rame6: string
  connection: string
}

export type words = Array<word>
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

// export type wordResponse = { words: words }

// GET word LIST
export const getwords = async () =>
  get<words>(`${REACT_APP_API_URL}${locales}/word/all`)

// GET SINGLE word
export const getword = async (wordId: string) =>
  get<word>(`${REACT_APP_API_URL}${locales}/word/${wordId}`)

// ADD NEw word
export const newWord = async (body: word) =>
  post(`${REACT_APP_API_URL}${locales}/word/add-word`, body)

// UPDATE word
export const editWord = async (body: word) =>
  put(`${REACT_APP_API_URL}${locales}/word/edit-word/${body.id}`, body)

// DELETE word
export const deleteWord = async (wordId: string) =>
  del(`${REACT_APP_API_URL}${locales}/word/${wordId}`)
