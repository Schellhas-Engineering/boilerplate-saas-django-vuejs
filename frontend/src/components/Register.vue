<template>
  <div
    fluid
    class="login-page fill-height text-left d-flex align-center justify-space-around"
  >
    <v-card width="min(75%, 500px)">
      <v-alert
        border="left"
        type="success"
        v-if="this.referrer.first_name !== ''"
      >
        {{ this.referrer.pre_referrer }}
        <b>{{ this.referrer.first_name }} {{ this.referrer.last_name }}</b>
        {{ this.referrer.post_referrer }}
      </v-alert>
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
      <v-card-title>Sign-up </v-card-title>
      <v-card-text>
        <v-form ref="registerForm">
          <v-row>
            <v-col>
              <v-text-field
                :rules="rules.nameRules"
                id="firstname"
                label="First name"
                v-model="registrationData.first_name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :rules="rules.nameRules"
                id="lastname"
                label="Last name"
                v-model="registrationData.last_name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            :rules="rules.emailRules"
            id="email"
            label="Email"
            v-model="registrationData.email"
          ></v-text-field>
          <v-text-field
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.passwordRules"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
            id="password"
            label="Password"
            v-model="registrationData.password"
          ></v-text-field>
          <v-text-field
            :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.passwordRules"
            :type="show_password2 ? 'text' : 'password'"
            @click:append="show_password2 = !show_password2"
            id="password2"
            label="Confirm password"
            v-model="registrationData.password2"
          ></v-text-field>
          <v-checkbox :rules="rules.privacyRules" v-model="acceptPrivacy">
            <template v-slot:label>
              <div>
                <span v-text="privacyStatement.intro"></span>
                <a
                  :href="privacyStatement.link"
                  target="_blank"
                  v-text="privacyStatement.linkText"
                >
                </a>
                <span v-text="privacyStatement.outro"></span>
              </div>
            </template>
          </v-checkbox>
          <v-btn
            :loading="loading"
            @click="handleSubmit"
            class="text-center"
            color="primary"
            type="submit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
      <v-alert
        class="ma-4 d-flex justify-space-around"
        type="error"
        v-if="error != ''"
      >
        {{ error }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acceptPrivacy: false,
      error: '',
      registrationData: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
      },
      loading: false,
      privacyStatement: {
        intro: 'I accept the ',
        linkText: 'Privacy Policy, Terms & Conditions',
        outro: '.',
        link: 'https://simplylca.io/privacy-policy/'
      },
      referrer: {
        first_name: '',
        last_name: '',
        pre_referrer: 'Nice to meet you! ',
        post_referrer: ' invited you to join our Early Access together!'
      },
      rules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          v => !!v || 'Last name is required',
          v => v.length <= 150 || 'Name must be less than 150 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 16 || 'Password must have at least 16 characters'
        ],
        privacyRules: [
          v =>
            !!v || 'You need to accept our privacy policy, terms & conditions'
        ]
      },
      show_password: false,
      show_password2: false
    }
  },
  mounted() {
    this.getReferrer()
  },
  methods: {
    async getReferrer() {
      const parameters = this.$route.query
      if ('re' in parameters) {
        this.registrationData.referrer_email = parameters.re
        this.referrer.first_name = parameters.rf
        this.referrer.last_name = parameters.rl
      }
    },
    async handleSubmit(e) {
      e.preventDefault()
      if (this.$refs.registerForm.validate()) {
        this.loading = true
        this.$api
          .post('/users/', this.registrationData)
          .then(response => {
            if (response.status === 201) {
              this.$emit('registered')
              this.$router
                .push(
                  '/thank-you-for-signing-up?re=' +
                    this.registrationData.email +
                    '&rf=' +
                    this.registrationData.first_name +
                    '&rl=' +
                    this.registrationData.last_name
                )
                .catch(() => {})
            }
          })
          .catch(response => {
            this.error = 'There was an error. Please check your entries.'
            this.loading = false
          })
      }
    }
  }
}
</script>
