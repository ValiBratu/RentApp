<template>
  <div class="posts flex place-content-center">
    <div class="filters"></div>
    <div class="w-5/6 h-full shadow-md p-10">
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-8"
      >
        <post-card
          v-for="post in state.posts"
          :key="post.rentPost.id"
          :card="post.rentPost"
        ></post-card>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import PostCard from '../components/cards/PostCard.vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  components: { PostCard },
  setup() {
    let store = useStore();
    let state = reactive({
      posts: [],
    });
    onMounted(async () => {
      let response = await store.dispatch('fetchRentPosts');
      if (response && response.status === 200) {
        state.posts = response.data;
      }
    });
    return { state };
  },
};
</script>
<style scoped>
.posts {
  background-color: mintcream;
}
</style>
