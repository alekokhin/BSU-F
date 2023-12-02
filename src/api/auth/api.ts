import { post } from 'lib/request/request'
import { AuthUserResponse } from 'providers/auth'
import Cookies from 'universal-cookie'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export type AuthInput = {
  username: string
  password: string
}
const cookies = new Cookies()

export const auth = async (body: AuthInput) =>
  post<AuthUserResponse>(`${REACT_APP_API_URL}auth/signin`, body)

export const reissueToken = async () =>
  post<AuthUserResponse>(`${REACT_APP_API_URL}auth/refreshtoken`, {
    refreshToken: cookies.get('refreshToken'),
  })
