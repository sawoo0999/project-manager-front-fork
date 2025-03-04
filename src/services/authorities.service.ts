import axiosApi from '@/helper/api_helper'
import { UpdateAuthoritiesRequest } from '@/shared/types/authorities'

export const updateAuthorities = async ({
  projectId,
  role,
  email,
}: UpdateAuthoritiesRequest) => {
  const response = await axiosApi.put(`projects/${projectId}/userrole`, {
    role,
    email,
  })
  return response.data
}
