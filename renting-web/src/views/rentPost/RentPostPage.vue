<template>
  <div class="rent-post-page m-auto w-4/6 shadow-lg p-5 mb-10">
    <Carousel
      v-if="state.photos.length > 0"
      :value="state.photos"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="6000"
    >
      <template #item="slotProps">
        <img
          :src="`data:image/jpeg;base64,${slotProps.data.photo}`"
          class="w-full rounded-md"
        />
      </template>
    </Carousel>
    <div v-else>
      <img
        :src="require('../../assets/images/noPostPhoto.png')"
        class="object-scale-down h-96 w-full rounded-md mb-6"
      />
      <p class="text-lg font-semibold text-center mb-6">
        This post has no photos yet.
      </p>
    </div>
    <primary-button
      v-if="store.getters.userData.id === state.post.userId"
      text="Add photo"
      class="mb-4 m-auto"
      @click="openImageInput"
    ></primary-button>

    <hr />
    <div class="post-details mt-10">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="state.tab === tab.name ? 'text-blue-600 bg-gray-100' : ''"
          class="cursor-pointer inline-block p-4 rounded-t-lg active mr-2"
          @click="changeTab(tab.name)"
        >
          {{ tab.text }}
        </li>
      </ul>
      <div v-if="state.tab === 'info'" class="basic-info mt-4">
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Title</p>
          <p class="">{{ state.post.title }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Description</p>
          <p class="">{{ state.post.description }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Rooms</p>
          <p class="">{{ state.post.rooms }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">City</p>
          <p class="">{{ state.post.city }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Location</p>
          <p class="">{{ state.post.location }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Price</p>
          <p class="">{{ `${state.post.price}$` }}</p>
        </div>
        <div class="info-row border-b-2 mt-4">
          <p class="text-lg font-semibold">Posted by</p>
          <router-link
            :to="`/user/${state.post.userId}`"
            class="text-blue-600 w-max"
            >{{ `${state.post.userName}` }}</router-link
          >
        </div>
      </div>
    </div>
    <loading ref="loading"></loading>
    <input
      type="file"
      ref="imageInput"
      accept="image/png, image/jpeg, image/jpg"
      class="hidden"
      @change="addPostPhoto"
    />
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import Carousel from 'primevue/carousel';
import Loading from '../../components/utils/Loading.vue';
import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
export default {
  name: 'RentPostPage',
  components: { Carousel, Loading, PrimaryButton },
  setup() {
    const store = useStore();
    const route = useRoute();
    let state = reactive({
      post: {},
      photos: [],
      tab: 'info',
    });
    const tabs = [
      {
        name: 'info',
        text: 'Post details',
      },
      {
        name: 'map',
        text: 'Show on map',
      },
    ];

    let loading = ref(null);
    let imageInput = ref(null);
    let setPostDetails = async () => {
      let response = await store.dispatch('fetchPostDetails', {
        id: route.params.id,
      });
      if (response && response.status === 200) {
        state.post = response.data;
      }
    };
    let setPostPhotos = async () => {
      let response = await store.dispatch('fetchPostPhotos', {
        id: route.params.id,
      });
      if (response && response.status === 200) {
        state.photos = response.data;
      }
    };
    let openImageInput = () => {
      imageInput.value.click();
    };
    let addPostPhoto = e => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      let file = e.target.files[0];
      let newPhoto = '';
      let fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async function () {
        let imageData = fileReader.result;

        let base64String = btoa(
          String.fromCharCode(...new Uint8Array(imageData)),
        );
        newPhoto = base64String;
        let response = await store.dispatch('addPostPhoto', {
          rentPostId: route.params.id,
          photo: newPhoto,
        });
        if (response && response.status === 201) {
          state.photos.push(response.data);
        }
      };
    };
    let showLoading = () => {
      loading.value.openModal();
    };
    let hideLoading = () => {
      loading.value.closeModal();
    };
    let changeTab = tab => {
      state.tab = tab;
    };
    onMounted(async () => {
      showLoading();
      await setPostDetails();
      await setPostPhotos();
      hideLoading();
    });
    return {
      state,
      loading,
      tabs,
      changeTab,
      store,
      imageInput,
      openImageInput,
      addPostPhoto,
    };
  },
};
</script>

<style scoped>
.rent-post-page {
  background-color: mintcream;
}
.info-row {
  @apply grid grid-cols-2 md:h-10 sm:h-16;
  grid-template-columns: 140px auto;
}
</style>
