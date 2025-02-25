export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  nickname: string
}

export interface LoginResponse {
  token: string
}

export interface WithdrawalRequest {
  password: string
}
export interface PasswordRequest {
  password: string
}
