const env = import.meta.env.VITE_DEPLOY_ENV
const apiUrl = import.meta.env.VITE_API_URL
const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID
const kakaoRedirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URI
export { env, apiUrl, kakaoClientId, kakaoRedirectUrl }
