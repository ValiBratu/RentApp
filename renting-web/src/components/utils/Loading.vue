<template>
  <modal
    ref="modal"
    modalContentClass="grid place-items-center h-40"
    :showCloseButton="false"
  >
    <ProgressSpinner></ProgressSpinner>
  </modal>
</template>

<script>
import { ref } from '@vue/reactivity';
import Modal from './Modal.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'Loading',
  components: { Modal, ProgressSpinner },
  setup() {
    let modal = ref(null);
    let closeModal = () => {
      modal.value.closeModal();
    };
    let openModal = () => {
      modal.value.showModal();
    };
    return { modal, closeModal, openModal };
  },
};
</script>

<style scoped></style>
