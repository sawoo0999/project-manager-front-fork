import { HttpStatusCode } from 'axios'

export interface APIResponse<T> {
  httpStatusCode: HttpStatusCode
  message: string
  data: T | null
}
