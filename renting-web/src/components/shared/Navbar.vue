<template>
  <div class="navbar absolute top-0 w-full h-20 shadow-sm px-5 py-3">
    <div class="flex justify-between h-full">
      <router-link to="/" class="flex items-center">
        <img src="../../assets/images/logo.png" class="w-10 h-10 mr-1" />
        <p class="font-semibold text-xl">Rentify</p>
      </router-link>
      <div class="profile flex items-center">
        <div v-if="!store.getters.userData.token" class="flex items-center">
          <router-link
            to="/login"
            class="font-semibold text-base mr-2 hover:text-green-600 cursor-pointer"
          >
            Sign in
          </router-link>
          <router-link to="/register">
            <primary-button text="Sign up"></primary-button>
          </router-link>
        </div>
        <div v-else class="flex items-center">
          <router-link
            :to="`/user/${store.getters.userData.id}`"
            class="flex items-center hover:text-green-600 cursor-pointer"
          >
            <i class="pi pi-user mr-2"></i>
            <p class="font-semibold text-base mr-3">Profile</p>
          </router-link>
          <p
            class="font-semibold text-base mr-2 hover:text-red-600 cursor-pointer"
            @click="logout"
          >
            Log out
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PrimaryButton from '../buttons/PrimaryButton.vue';
export default {
  name: 'Navbar',
  components: { PrimaryButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    let logout = async () => {
      window.localStorage.clear();
      await router.push({ name: 'Home' });
      window.location.reload();
    };
    return { store, logout };
  },
};
</script>

<style scoped>
.navbar {
  background-color: mintcream;
}
</style>
