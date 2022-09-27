<template>
  <modal-factory />
  <router-view />
</template>

<script>
import ModalFactory from '@/components/ModalFactory'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import services from '@/services'
import { setCurrentUser } from '@/store/user'

export default {
  components: {
    ModalFactory
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        if (!token) {
          router.push({ name: 'Home' })
        }

        const { data } = await services.users.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
