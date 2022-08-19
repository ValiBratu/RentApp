<template>
  <div class="landing-page -mt-12 mb-16">
    <div class="banner w-full bg-gradient-to-t from-green-500 to-blue-500">
      <div class="text-center">
        <p class="font-semibold text-4xl text-white">Welcome to Rentify!</p>
        <p class="font-semibold text-xl text-white mt-4 mb-14">
          Rentify is the best way to rent unique, local acommodations on any
          travel budget.
        </p>
        <router-link to="/posts">
          <primary-button
            text="See newest listings"
            buttonClass="bg-white animate-bounce mx-auto"
            textClass="text-black"
          ></primary-button>
        </router-link>
      </div>
    </div>
    <div class="flow place-content-center items-center">
      <p class="text-2xl font-semibold text-center my-10">How it works</p>
      <div
        class="grid gap-y-4 lg:grid-cols-3 md:grid-cols-1 place-items-center"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p class="text-md font-semibold text-gray-600">
            Explore unique places to stay.
          </p>
        </div>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p class="text-md font-semibold text-gray-600">
            Contact your host to learn about their place.
          </p>
        </div>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p class="text-md font-semibold text-gray-600">
            Book a stay with your host in a great location.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '../components/buttons/PrimaryButton.vue';

export default {
  name: 'landingpage',
  components: { PrimaryButton },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.banner {
  @apply w-full flex place-content-center items-center;
  height: 500px;
}
</style>
