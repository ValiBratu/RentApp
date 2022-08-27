<template>
  <div
    class="not-found flex md:flex-row sm:flex-col place-content-center items-center gap-20 transform top-1/2 translate-y-1/2"
  >
    <img src="../assets/images/notfound.png" />
    <div class="text-center max-w-sm">
      <p class="text-3xl font-semibold">Page not found</p>
      <p class="mt-4">
        We can't find the page you're looking for.You can either return to the
        previous page,visit our homepage or contact our support team.
      </p>
      <router-link to="/">
        <primary-button
          class="bg-blue-500 hover:bg-blue-600 md:right-0 mt-4 m-auto"
          text="Return to homepage"
        ></primary-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
export default {
  name: 'NotFound',
  components: { PrimaryButton },
};
</script>

<style></style>
