//utils
import api from '@/services/api'
import { LoginRespones } from '@/services/user'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  //hooks
  const toast = useToast()
  const router = useRouter()
  //data
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const username = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)
  //computed
  const isAuthenticated = computed(() => !!token.value)
  //methods
  async function login(email: string, password: string) {
    try {
      const response = await api.users.loginUser({ user: { password, email } })
      toast.success('Loged Inn')
      handelLoginResponse(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function register(username: string, password: string, email: string) {
    try {
      const response = await api.users.registerUser({
        user: { username, password, email },
      })
      toast.success('Registered IN')
      handelLoginResponse(response)
    } catch (error) {
      console.error(error)
    }
  }

  function handelLoginResponse(response: LoginRespones) {
    const authToken = response.user.token
    token.value = authToken
    localStorage.setItem('authToken', authToken)
    router.push('/')
  }

  function logout() {
    token.value = null
    username.value = null
    errorMessage.value = null
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  async function setUser() {
    const result = await api.users.getUser()
    username.value = result.user.username
  }

  return {
    isAuthenticated,
    setUser,
    token,
    username,
    errorMessage,
    login,
    logout,
    register,
  }
})
