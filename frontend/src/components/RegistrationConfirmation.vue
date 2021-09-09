<template>
  <div
    fluid
    class="login-page fill-height text-left d-flex align-center justify-space-around"
  >
    <v-card width="min(75%, 500px)">
      <v-icon color="primary" size="800%" class="d-flex justify-center">
        mdi-account-check
      </v-icon>
      <v-card-title class="d-flex justify-center text-center text-no-break">
        Thank you for signing up for Early&nbsp;Access!
      </v-card-title>
      <v-card-text class="text-center">
        <v-row class="d-flex align-center">
          <v-col cols="12">
            <v-row class="d-flex align-center justify-space-around text-h6">
              <p>
                You are currently in place
                <span class="primary--text">81</span> on the waiting list.
              </p>
            </v-row>
            <v-row>
              <v-col class="d-flex align-center flex-column">
                <p class="text-subtitle-2">
                  Invite your colleagues to move up in the waiting list
                  together! You'll all share the same place in the waiting list!
                </p>
                <v-text-field
                  dense
                  readonly
                  :append-icon="copied ? 'mdi-check-bold' : 'mdi-content-copy'"
                  @click:append="copyLink()"
                  v-model="referrer.link"
                  id="referralLink"
                  filled
                  outlined
                  style="width: min(90%, 300px);"
                ></v-text-field>
                <p class="text-subtitle-2">
                  We will send you an email when your account has been
                  activated.
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="copied" timeout="1250" color="primary" centered>
      Copied
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      referrer: {
        email: '',
        first_name: '',
        last_name: '',
        link: ''
      },
      copied: false
    }
  },
  mounted() {
    this.getReferrer()
  },
  methods: {
    async getReferrer() {
      const parameters = this.$route.query
      if ('re' in parameters) {
        this.referrer.email = parameters.re
        this.referrer.first_name = parameters.rf
        this.referrer.last_name = parameters.rl
        this.referrer.link =
          'https://app.simplylca.io/#/register?re=' +
          this.referrer.email +
          '&rf=' +
          this.referrer.first_name +
          '&rl=' +
          this.referrer.last_name
      }
    },
    async copyLink() {
      navigator.clipboard.writeText(this.referrer.link).then(() => {
        this.copied = true
      })
    }
  }
}
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
