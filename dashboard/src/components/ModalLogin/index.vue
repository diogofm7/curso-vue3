<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button
      @click="close"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          placeholder="jone.doe@gmail.com"
          type="email"
        >
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          type="password"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
      :disabled="state.isLoading"
      type="submit"
      class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      :class="{
        'opacity-50': state.isLoading
      }"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>

    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '@/hooks/useModal'
import Icon from '@/components/Icon'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@/utils/validators'
import services from '@/services'

export default {
  name: 'loginModal',
  components: {
    Icon
  },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      toast.clear()
      try {
        state.isLoading = true

        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return true
        }

        if (errors.status === 404) {
          toast.error('Usuário não encontrado')
        }
        if (errors.status === 401) {
          toast.error('Email ou senha inválidos')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        console.log(error)
        toast.error('Ocorreu um erro ao fazer o login')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
