import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'

const { VITE_GLOB_API_URL, VITE_GLOB_API_TOKEN } = import.meta.env

const config = {
  baseURL: VITE_GLOB_API_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
}
const service = axios.create(config)

service.interceptors.request.use(
  (config) => {
    if (VITE_GLOB_API_TOKEN) {
      config.headers['EGW-TOKEN'] = VITE_GLOB_API_TOKEN
      config.params = config.params || {}
      config.params.token = VITE_GLOB_API_TOKEN
    }

    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
