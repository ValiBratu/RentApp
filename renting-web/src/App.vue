<template>
  <navbar></navbar>
  <div class="mt-20">
    <router-view />
  </div>
</template>
<script>
import Navbar from './components/shared/Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
  setup() {
    return {};
  },
};
</script>

<style></style>
