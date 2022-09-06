<template>
  <div class="post-card max-w-sm rounded-lg overflow-hidden shadow-lg pb-4">
    <img
      class="w-full h-72 border-b-2"
      :src="
        card.rentPostPhotos[0]
          ? `data:image/jpeg;base64,${card.rentPostPhotos[0].photo}`
          : baseImagePath
      "
    />

    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ card.title }}</div>
      <p class="text-gray-700 text-base mb-2">{{ card.title }}</p>
      <p class="text-gray-700 text-base font-semibold">
        Price: {{ card.price }}$
      </p>
    </div>
    <router-link :to="`/post/${card.id}`">
      <primary-button
        text="Show details"
        buttonClass="bg-blue-500 hover:bg-blue-600"
        class="w-32 mx-auto"
      ></primary-button>
    </router-link>
  </div>
</template>

<script>
import PrimaryButton from '../buttons/PrimaryButton.vue';
export default {
  name: 'PostCard',
  components: { PrimaryButton },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const baseImagePath = require('@/assets/images/noPostPhoto.png');
    return {
      baseImagePath,
    };
  },
};
</script>

<style></style>
