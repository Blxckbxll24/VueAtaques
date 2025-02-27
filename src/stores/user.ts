import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginService, RegisterService, LogoutService } from '@/services/UserServices'
import { useStorage } from '@vueuse/core'
import { logService } from '@/services/LogServices'

import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = useStorage('token', '')
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      console.log(response)
      if (response && response.token) {
        token.value = response.token
        console.log('aaa', token.value)
        user.value = response.data
        console.log('Token guardado:', token.value)
      } else {
        console.error('Error: No se recibió token en la respuesta')
      }
    } catch (error: any) {
      console.error('Error durante login:', error)
      await logService.log('error', 'Error durante login', { error, email })
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await RegisterService(email, password)
      if (response.status === 200) {
        user.value = response.data
        token.value = user.value.token
      }
    } catch (error: any) {
      const errorMessage = 'Error during registration'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error, email })
    }
  }

  async function logout() {
      const response = await LogoutService()
        user.value = {} as User
        token.value = ''
        console.log(response)


  }

  return { login, register, logout, isLoggedIn, token }
})
