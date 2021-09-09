<template>
  <div class="Home">
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from '../components/LandingPage'

export default {
  name: 'Home',

  components: {
    LandingPage
  }
}

console.log('ROOT API: ' + process.env.VUE_APP_ROOT_API)
</script>
