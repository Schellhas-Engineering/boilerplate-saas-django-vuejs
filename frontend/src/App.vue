<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="SimplyLCA Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/logo-white.svg')"
            transition="scale-transition"
            width="120"
            title="SimplyLCA - Home"
          />
        </router-link>
        <v-chip
          label
          class="ma-2 font-weight-bold"
          color="primary darken-2"
          text-color="white"
        >
          Early Access
          <v-icon right>mdi-tools</v-icon>
        </v-chip>
      </div>

      <v-spacer />

      <v-text-field
        dense
        clearable
        hide-details
        label="Search"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        solo
      ></v-text-field>

      <v-spacer />

      <v-btn text dark to="/login" v-if="!loggedIn">
        Login
      </v-btn>
      <v-btn text dark v-if="loggedIn" @click="$emit('loggedOut')"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-main
      fluid
      class="d-flex fill-height overflow-hidden"
      style="max-height: 100vh; background-color: #fafafa;"
    >
      <v-row class="ma-0 fill-height">
        <v-col style="max-width: 56px" v-if="loggedIn" class="d-none d-sm-flex">
          <v-navigation-drawer
            clipped
            permanent
            absolute
            expand-on-hover
            v-model="menuOpen"
          >
            <v-list nav dense class="fill-height">
              <v-list-item-group v-model="selectedNavItem">
                <v-list-item
                  v-for="(navItem, i) in navItems"
                  :key="i"
                  :to="navItem.route"
                  :title="navItem.text"
                >
                  <v-list-item-icon>
                    <v-icon v-text="navItem.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="navItem.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col
          :class="
            loggedIn
              ? 'fill-height overflow-auto'
              : 'fill-height overflow-auto pa-0'
          "
        >
          <router-view fluid />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    loggedIn: false,
    menuOpen: true,
    selectedNavItem: 0,
    navItems: [
      {
        text: 'Workspaces',
        icon: 'mdi-view-dashboard',
        route: '/workspaces/'
      }
    ]
  }),

  mounted() {},

  created() {
    this.$on('loggedIn', this.login)
    this.$on('loggedOut', this.logout)
    this.$emit('loggedIn')
  },

  methods: {
    login() {
      if (localStorage.getItem('token') && localStorage.getItem('user')) {
        this.loggedIn = true
        console.log('Logged in')
      }
    },
    logout() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      }
      this.loggedIn = false
      this.$router.go()
    }
  }
}
</script>
