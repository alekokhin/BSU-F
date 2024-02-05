import { isLocal } from 'components/form/validations'
import { del, get, post, put } from 'lib/request/request'
import { locales } from 'providers/locales'

export type Word = {
  id: string
  word: string
  correctForm: string
  intonation: string
  thematicGroup: string
  partOfSpeech: string
  dictionary: string
}

export type words = Array<Word>
const REACT_APP_API_URL = isLocal
  ? process.env.REACT_APP_LOCAL_API_URL
  : process.env.REACT_APP_API_URL
// export type wordResponse = { words: words }

// GET word LIST
export const getWords = async () =>
  get<words>(`${REACT_APP_API_URL}${locales}/word/all`)

// GET SINGLE word
export const getWord = async (wordId: string) =>
  get<Word>(`${REACT_APP_API_URL}${locales}/word/${wordId}`)

// ADD NEw word
export const newWord = async (body: Word) =>
  post(`${REACT_APP_API_URL}${locales}/word/add-word`, body)

// UPDATE word
export const editWord = async (body: Word) =>
  put(`${REACT_APP_API_URL}${locales}/word/edit-word/${body.id}`, body)

// DELETE word
export const deleteWord = async (wordId: string) =>
  del(`${REACT_APP_API_URL}${locales}/word/${wordId}`)
