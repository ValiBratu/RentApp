<template>
  <div class="add-rent-post p-4">
    <p class="text-xl font-semibold ml-4">Add a new post</p>
    <form class="flex flex-col gap-4 mt-6" onsubmit="return false" ref="form">
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">Title</p>
        <input
          v-model="state.post.title"
          type="text"
          maxlength="250"
          placeholder="Title"
          class="w-full h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
      </div>
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">Description</p>
        <input
          v-model="state.post.description"
          type="text"
          maxlength="250"
          placeholder="Description"
          class="w-full h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
      </div>
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">City</p>
        <Dropdown
          v-model="state.post.city"
          class="mb-4 w-full"
          placeholder="Select a city"
          :options="store.getters.cities"
          optionLabel="name"
          optionValue="id"
        ></Dropdown>
      </div>
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">Location</p>
        <input
          v-model="state.post.location"
          type="text"
          maxlength="250"
          placeholder="Location"
          class="w-full h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
      </div>
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">Number of rooms</p>
        <input
          v-model="state.post.rooms"
          type="number"
          min="0"
          placeholder="Number of rooms"
          class="w-full h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
      </div>
      <div class="px-4">
        <p class="font-semibold text-lg mb-2">Price</p>
        <input
          v-model="state.post.price"
          type="number"
          min="0"
          placeholder="Price"
          class="w-full h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
      </div>

      <input ref="submit" type="submit" class="hidden" />
    </form>

    <primary-button
      text="Add"
      class="mt-6 text-center m-auto"
      textClass=" text-white px-6"
      :disabled="state.buttonState"
      @click="saveRentPost"
    ></primary-button>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import Dropdown from 'primevue/dropdown';
import { useStore } from 'vuex';
import PrimaryButton from '../buttons/PrimaryButton.vue';
import { watch } from '@vue/runtime-core';
export default {
  name: 'AddRentPost',
  components: { Dropdown, PrimaryButton },
  setup() {
    const store = useStore();
    let state = reactive({
      post: {
        title: '',
        description: '',
        city: '',
        location: '',
        price: '',
        rooms: '',
      },

      buttonState: true,
    });
    let submit = ref(null);

    let saveRentPost = () => {
      submit.value.click();
    };

    let validateData = () => {
      return (
        state.post.title !== '' &&
        state.post.description !== '' &&
        state.post.city !== '' &&
        state.post.location !== '' &&
        state.post.price !== '' &&
        state.post.price > 0 &&
        state.post.rooms !== '' &&
        state.post.rooms > 0
      );
    };
    watch(
      () => state.post,
      () => {
        state.buttonState = !validateData();
      },
      { deep: true },
    );
    return { state, submit, store, saveRentPost };
  },
};
</script>

<style scoped>
.add-rent-post {
  width: 450px;
}
</style>
