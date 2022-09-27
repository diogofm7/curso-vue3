import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersService from './users'
import { setGlobalLoading } from '@/store/global'

const API_ENVS = {
  local: 'http://localhost:3000',
  development: '',
  production: ''
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const conThrowAnError = error.response.status === 0 ||
    error.response.status === 500

  if (conThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
