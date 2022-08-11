<template>
  <div
    class="primary-btn border-2 flex items-center h-10 px-3 rounded-lg text-white cursor-pointer"
  >
    <p class="font-semibold text-base">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style></style>
