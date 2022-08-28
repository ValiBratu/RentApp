<template>
  <div class="mt-6">
    <div
      class="user-posts grid lg:grid-cols-2 md:grid-cols-1 md:place-items-center gap-y-8 mb-2"
    >
      <post-card
        v-for="card in state.posts"
        :key="card.id"
        :card="card"
      ></post-card>
    </div>
    <primary-button
      v-if="favorites && state.posts.length > 0"
      text="Export to PDF"
      class="mt-6 m-auto"
      @click="getFavoritesPdf"
    ></primary-button>
    <a href="" class="hidden" ref="pdfDownload" download="Posts.pdf" />
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import PostCard from '../../components/cards/PostCard.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
export default {
  name: 'UserPosts',
  components: { PostCard, PrimaryButton },
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
    let pdfDownload = ref(null);
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
    let getFavoritesPdf = async () => {
      fetch('https://localhost:44364/api/Export/' + route.params.id)
        .then(function (response) {
          return response.blob();
        })
        .then(function (myBlob) {
          var objectURL = URL.createObjectURL(myBlob);

          pdfDownload.value.href = objectURL;
          pdfDownload.value.click();
        });
    };

    onMounted(async () => {
      emit('showLoad');
      await fetchPosts();
      emit('closeLoad');
    });
    return { state, getFavoritesPdf, pdfDownload };
  },
};
</script>

<style></style>
