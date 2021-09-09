<template>
  <v-container
    fluid
    class="login-page fill-height text-left d-flex align-center justify-space-around"
  >
    <v-card max-width="min(75%, 400px)">
      <v-row class="d-flex justify-space-around mt-4">
        <v-img
          alt="SimplyLCA Logo"
          class="shrink"
          contain
          :src="require('@/assets/logo-color.svg')"
          transition="scale-transition"
          width="50%"
        />
      </v-row>
      <v-card-title>Login </v-card-title>
      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field
            dense
            autofocus
            v-model="email"
            :rules="emailRules"
            id="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="show_password = !show_password"
          ></v-text-field>
          <v-btn
            color="primary"
            class="text-center"
            type="submit"
            @click="handleSubmit"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-alert
        v-if="error != ''"
        type="error"
        class="ma-4 d-flex justify-space-around"
        >{{ error }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
      error: '',
      loading: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        this.$api
          .post('/login/', {
            password: this.password,
            username: this.email
          })
          .then(response => {
            if (response.data.token != null) {
              localStorage.setItem('token', response.data.token)
              return this.$api.get('/users/')
            }
          })
          .then(response => {
            localStorage.setItem(
              'user',
              JSON.stringify(response.data.results[0])
            )
            this.$parent.$parent.$parent.$emit('loggedIn')
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl).catch(() => {})
            } else {
              this.$router.push('/').catch(() => {})
            }
          })
          .catch(response => {
            this.error =
              'There was an error. Please check your login credentials.'
            this.loading = false
          })
      }
    }
  }
}
</script>

<style>
.login-page {
  background-image: url("~@/assets/login-background.jpg");
  background-position: center center;
  background-size: cover;
}
</style>
