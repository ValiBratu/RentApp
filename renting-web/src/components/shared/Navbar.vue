<template>
  <div class="navbar absolute top-0 w-full h-20 shadow-sm px-5 py-3">
    <div class="flex justify-between h-full">
      <div class="flex cursor-pointer items-center">
        <img src="../../assets/images/logo.png" class="w-10 h-10 mr-1" />
        <p class="font-semibold text-xl">Rentify</p>
      </div>
      <div class="profile flex items-center">
        <p
          class="font-semibold text-base mr-2 hover:text-green-600 cursor-pointer"
        >
          Sign in
        </p>
        <primary-button
          text="Sign up"
          class="bg-green-500 hover:bg-green-600"
        ></primary-button>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '../buttons/PrimaryButton.vue';
export default {
  name: 'Navbar',
  components: { PrimaryButton },
  setup() {
    return {};
  },
};
</script>

<style></style>
