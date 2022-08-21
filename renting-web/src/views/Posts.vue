<template>
  <div class="posts flex place-content-center mb-10">
    <div class="posts-container w-5/6 h-full shadow-md p-10">
      <div class="filters relative w-full md:mb-0 sm:mb-16">
        <p class="text-xl font-semibold mb-4">Filters</p>
        <div>
          <p class="text-base font-semibold mb-2">Select a city:</p>
          <Dropdown
            v-model="state.selectedCity"
            class="w-40 mb-4"
            :options="state.cities"
            optionLabel="name"
            optionValue="id"
            @change="filterByCity"
          ></Dropdown>
        </div>
        <div class="md:flex">
          <div class="mr-10">
            <p class="text-base font-semibold mb-2">Select number of rooms:</p>
            <Dropdown
              v-model="state.numberOfRooms"
              class="w-24 mb-4"
              :options="state.rooms"
              @change="filterbyRooms"
            ></Dropdown>
          </div>
          <div>
            <p class="text-base font-semibold mb-2 slider-label">
              Select the price range:
              {{ ` $${state.priceRange[0]} - $${state.priceRange[1]}` }}
            </p>
            <Slider
              v-model="state.priceRange"
              class="mt-7"
              :min="0"
              :max="1000"
              :range="true"
              @slideend="filterByPrice"
            ></Slider>
          </div>
          <primary-button
            :text="state.sortNewest ? 'See oldest' : 'See newest'"
            buttonClass="bg-blue-500 hover:bg-blue-600 absolute md:right-0 mt-4"
            @click="sortByDate"
          ></primary-button>
        </div>
        <primary-button
          text="Add a new post"
          buttonClass="absolute top-0 right-0 bg-green-500 hover:bg-green-600"
          @click="openModal"
        ></primary-button>
      </div>
      <hr />
      <div
        v-if="state.posts.length > 0"
        class="mt-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-8"
      >
        <post-card
          v-for="post in state.posts"
          :key="post.id"
          :card="post"
        ></post-card>
      </div>
      <div v-else class="text-xl font-semibold text-center mt-8">
        There are no posts, but you can add one.
      </div>
    </div>
    <modal ref="modal" :showCloseButton="true">
      <add-rent-post @confirmAdd="confirmAddPost"></add-rent-post>
    </modal>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import PostCard from '../components/cards/PostCard.vue';
import { useStore } from 'vuex';
import Loading from '../components/utils/Loading.vue';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import Modal from '../components/utils/Modal.vue';
import AddRentPost from '../components/forms/AddRentPost.vue';
export default {
  name: 'Posts',
  components: {
    PostCard,
    Loading,
    Dropdown,
    Slider,
    PrimaryButton,
    Modal,
    AddRentPost,
  },
  setup() {
    let store = useStore();
    let state = reactive({
      posts: [],
      cities: [],
      selectedCity: 0,
      rooms: [],
      numberOfRooms: 0,
      priceRange: [0, 1000],
      sortNewest: true,
    });
    let loading = ref(null);
    let modal = ref(null);
    let fetchPosts = async () => {
      let response = await store.dispatch('fetchRentPosts');
      if (response && response.status === 200) {
        state.posts = response.data
          .map(post => {
            return post.rentPost;
          })
          .reverse();
        state.rooms = [
          ...new Set(
            response.data.map(post => {
              return post.rentPost.rooms;
            }),
          ),
        ].sort();
        state.rooms.unshift('All');
        state.numberOfRooms = state.rooms[0];
      }
    };
    let fetchCities = async () => {
      let response = await store.dispatch('fetchCities');
      if (response && response.status === 200) {
        state.cities = [{ id: 0, name: 'All' }, ...response.data];
      }
    };
    let filterByCity = async () => {
      loading.value.openModal();
      let response = await store.dispatch(
        'fetchPostsByCity',
        state.selectedCity,
      );
      if (response && response.status === 200) {
        state.posts = response.data;
        state.numberOfRooms = state.rooms[0];
        state.priceRange = [0, 1000];
      }
      loading.value.closeModal();
    };

    let filterbyRooms = () => {
      if (state.numberOfRooms === 'All') {
        state.posts = store.getters.rentPosts;
        return;
      }
      let newList = store.getters.rentPosts.filter(
        post => post.rooms === state.numberOfRooms,
      );
      state.priceRange = [0, 1000];
      state.posts = newList;
    };

    let filterByPrice = () => {
      if (state.numberOfRooms === 'All') {
        let newList = store.getters.rentPosts.filter(
          post =>
            post.price >= state.priceRange[0] &&
            post.price <= state.priceRange[1],
        );
        state.posts = newList;
        return;
      }
      let newList = store.getters.rentPosts.filter(
        post =>
          post.price >= state.priceRange[0] &&
          post.price <= state.priceRange[1] &&
          post.rooms === state.numberOfRooms,
      );
      state.posts = newList;
    };
    let confirmAddPost = () => {
      fetchPosts();
      modal.value.closeModal();
    };

    let sortByDate = () => {
      state.sortNewest = !state.sortNewest;
      state.posts.reverse();
    };

    let openModal = () => {
      modal.value.showModal();
    };

    onMounted(async () => {
      loading.value.openModal();
      await fetchCities();
      await fetchPosts();
      loading.value.closeModal();
    });
    return {
      state,
      loading,
      filterByCity,
      filterbyRooms,
      filterByPrice,
      openModal,
      modal,
      confirmAddPost,
      sortByDate,
    };
  },
};
</script>
<style scoped>
.posts-container {
  background-color: mintcream;
}
.slider-label {
  margin-top: 3px;
}
</style>
