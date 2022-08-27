<template>
  <div
    class="user-posts mt-6 grid lg:grid-cols-2 md:grid-cols-1 md:place-items-center gap-y-8"
  >
    <post-card
      v-for="card in state.posts"
      :key="card.id"
      :card="card"
    ></post-card>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import PostCard from '../../components/cards/PostCard.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
export default {
  name: 'UserPosts',
  components: { PostCard },
  props: {
    favorites: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['showLoad', 'closeLoad'],
  setup(props, { emit }) {
    let state = reactive({
      posts: [],
    });
    const store = useStore();
    const route = useRoute();

    let fetchPosts = async () => {
      let response = await store.dispatch(
        props.favorites ? 'fetchUserFavorites' : 'fetchUserPosts',
        {
          id: route.params.id,
        },
      );
      if (response && response.status === 200) {
        state.posts = response.data;
      }
    };

    onMounted(async () => {
      emit('showLoad');
      await fetchPosts();
      emit('closeLoad');
    });
    return { state };
  },
};
</script>

<style></style>
