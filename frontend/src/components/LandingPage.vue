<template>
  <v-container fluid class="fill-height">
    <v-row class="text-left d-flex align-center">
      <v-col center cols="6" class="mb-4 pa-12">
        <v-chip label color="primary" class="mb-2">
          <b>NOW IN EARLY ACCESS!</b>
        </v-chip>

        <h1 class="text-h2 mb-3">
          Release your app within weeks!
        </h1>

        <p>
          With <b class="primary--text">SimplySaaS</b>, you can create a
          Software-as-a-Service solution withtin week. User management,
          multitenant supper, subsription management, and payments through
          <i>Stripe</i> are only few of the features included.
        </p>

        <v-list>
          <v-list-item v-for="(item, i) in checkListItems" :key="i" dense>
            <v-list-item-icon>
              <v-icon color="primary" large v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content v-text="item.text" />
          </v-list-item>
        </v-list>

        <router-link to="/register">
          <v-btn
            color="primary"
            x-large
            class="text-center"
            :style="{ left: '50%', transform: 'translateX(-50%)' }"
          >
            <v-icon class="pr-4">
              mdi-lock-open
            </v-icon>
            Request Early Access
          </v-btn>
        </router-link>
      </v-col>

      <v-col cols="6" class="pa-6"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LandingPage',

  data: () => ({
    checkListItems: [
      {
        icon: 'mdi-checkbox-marked-circle',
        text:
          'Make your idea into an MVP within days.'
      },
      {
        icon: 'mdi-checkbox-marked-circle',
        text: 'Get your first paying customers without hustle.'
      },
      {
        icon: 'mdi-checkbox-marked-circle',
        text:
          'Increase your speed of development with Continous Integration.'
      },
      {
        icon: 'mdi-checkbox-marked-circle',
        text:
          'Let your users collaborate across organisations.'
      }
    ],
    dialog: false
  })
}
</script>
