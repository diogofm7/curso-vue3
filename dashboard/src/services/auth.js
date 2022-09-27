export default httpClient => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post('/auth/register', {
      name,
      email,
      password
    })
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  login: async ({ email, password }) => {
    console.log('antes')
    const response = await httpClient.post('/auth/login', {
      email,
      password
    })
    console.log('depois')
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
