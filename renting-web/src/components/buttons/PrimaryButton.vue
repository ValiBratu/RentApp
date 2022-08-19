<template>
  <button
    type="button"
    :disabled="disabled"
    :class="disabled ? ' cursor-default bg-gray-500' : buttonClass"
    class="primary-btn border-2 flex items-center h-10 px-3 rounded-lg"
  >
    <p
      :class="textClass ? textClass : 'text-white'"
      class="font-semibold text-base"
    >
      {{ text }}
    </p>
  </button>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    text: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: 'bg-green-500 hover:bg-green-600',
    },
    textClass: {
      type: String,
    },
  },
};
</script>

<style></style>
