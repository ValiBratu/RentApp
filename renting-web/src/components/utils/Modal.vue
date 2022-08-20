<template>
  <div
    @click.self="closeModal"
    v-if="state.modalIsOpen"
    class="modal fixed z-50 w-full h-full top-0 left-0 bg-black bg-opacity-40"
  >
    <div
      :class="modalContentClass"
      class="modal-content absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl overflow-auto max-h-screen"
    >
      <span
        v-if="showCloseButton"
        class="absolute w-6 cursor-pointer z-10 top-4 right-4 md:top-6 md:right-6"
        @click="closeModal"
      >
        X
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'Modal',
  props: {
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    modalContentClass: {
      type: String,
      default: '',
    },
  },
  setup() {
    let state = reactive({
      modalIsOpen: false,
    });
    let showModal = () => {
      state.modalIsOpen = true;
    };
    let closeModal = () => {
      state.modalIsOpen = false;
    };
    return {
      state,
      showModal,
      closeModal,
    };
  },
};
</script>
<style scoped>
.modal-content {
  min-width: 22rem;
}
</style>
