<template>
  <div class="posts flex place-content-center">
    <div class="filters"></div>
    <div class="posts-container w-5/6 h-full shadow-md p-10">
      <div
        v-if="state.posts.length > 0"
        class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-8"
      >
        <post-card
          v-for="post in state.posts"
          :key="post.rentPost.id"
          :card="post.rentPost"
        ></post-card>
      </div>
      <div v-else class="text-xl font-semibold text-center">
        There are no posts, but you can add one.
      </div>
    </div>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import PostCard from '../components/cards/PostCard.vue';
import { useStore } from 'vuex';
import Loading from '../components/utils/Loading.vue';

export default {
  name: 'Home',
  components: { PostCard, Loading },
  setup() {
    let store = useStore();
    let state = reactive({
      posts: [],
    });
    let loading = ref(null);
    onMounted(async () => {
      loading.value.openModal();
      let response = await store.dispatch('fetchRentPosts');
      if (response && response.status === 200) {
        state.posts = response.data;
      }
      loading.value.closeModal();
    });
    return { state, loading };
  },
};
</script>
<style scoped>
.posts-container {
  background-color: mintcream;
}
</style>
