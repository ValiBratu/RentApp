<template>
  <div class="user-profile m-auto w-4/6 shadow-lg p-5 mb-10">
    <div class="profile-head flex gap-4">
      <img
        :class="
          store.getters.userData.id === route.params.id ? 'cursor-pointer' : ''
        "
        class="object-cover h-40 border-2 rounded-md"
        :src="
          state.user.photo
            ? `data:image/png;base64, ${state.user.photo}`
            : require('../assets/images/NoUserImage.jpg')
        "
        @click="openChangePhoto"
      />
      <div>
        <p class="text-xl font-semibold">{{ state.user.name }}</p>
        <p class="font-semibold mt-2">{{ state.user.numberOfPosts }} posts</p>
      </div>
    </div>
    <div class="profile-bio mt-10">
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
        <div class="info-row border-b-2 h-10 mt-4">
          <p class="text-lg font-semibold">Name</p>
          <p class="">{{ state.user.name }}</p>
        </div>
        <div class="info-row border-b-2 h-10 mt-4">
          <p class="text-lg font-semibold">Email</p>
          <p class="">{{ state.user.email }}</p>
        </div>
        <div class="info-row border-b-2 h-10 mt-4">
          <p class="text-lg font-semibold">Phone</p>
          <p class="">{{ state.user.phoneNumber }}</p>
        </div>
        <primary-button
          v-if="store.getters.userData.id === route.params.id"
          class="mt-6"
          text="Edit details"
          @click="openEditModal"
        ></primary-button>
      </div>
      <user-posts
        v-else-if="state.tab === 'posts'"
        @showLoad="showLoading"
        @closeLoad="hideLoading"
      ></user-posts>
      <user-posts
        v-else-if="state.tab === 'favs'"
        @showLoad="showLoading"
        @closeLoad="hideLoading"
        :favorites="true"
      ></user-posts>
    </div>
    <loading ref="loading"></loading>
    <input
      ref="profilePhoto"
      class="hidden"
      type="file"
      @change="handleProfilePhoto"
    />
    <modal ref="modal" modalContentClass=" p-10">
      <p class="text-lg font-semibold -mt-5 mb-10">Edit profile info</p>
      <div class="w-full flex flex-col gap-8">
        <input
          type="text"
          maxlength="255"
          v-model="state.newDetails.userName"
          placeholder="Username"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <input
          type="tel"
          maxlength="10"
          v-model="state.newDetails.phoneNumber"
          placeholder="Phone number"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <primary-button
          text="Save"
          class="w-16 m-auto"
          :disabled="state.editButtonState"
          @click="editUserData"
        ></primary-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import UserPosts from './userProfile/UserPosts.vue';
import Loading from '../components/utils/Loading.vue';
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import Modal from '../components/utils/Modal.vue';
export default {
  name: 'UserProfile',
  components: { UserPosts, Loading, PrimaryButton, Modal },
  setup() {
    let state = reactive({
      tab: 'info',
      user: {},
      newDetails: {
        userName: '',
        phoneNumber: '',
      },
      editButtonState: false,
    });
    const route = useRoute();
    const store = useStore();
    let loading = ref(null);
    let profilePhoto = ref(null);
    let modal = ref(null);
    const tabs = [
      {
        name: 'info',
        text: 'Basic info',
      },
      {
        name: 'posts',
        text: 'User posts',
      },
      {
        name: 'favs',
        text: 'User favorites',
      },
    ];
    let changeTab = tab => {
      state.tab = tab;
    };
    let showLoading = () => {
      loading.value.openModal();
    };
    let hideLoading = () => {
      loading.value.closeModal();
    };

    let openChangePhoto = () => {
      profilePhoto.value.click();
    };

    let updateProfilePhoto = async photo => {
      let response = await store.dispatch('putUserPhoto', {
        UserId: route.params.id,
        Photo: photo,
      });
      if (response && response.status === 204) {
        state.user.photo = photo;
      }
    };

    let addUserPhoto = async photo => {
      let response = await store.dispatch('postUserPhoto', {
        UserId: route.params.id,
        Photo: photo,
      });
      if (response && response.status === 201) {
        state.user.photo = photo;
      }
    };

    let handleProfilePhoto = async e => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      let file = e.target.files[0];
      let newPhoto = '';
      let fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = function () {
        let imageData = fileReader.result;

        let base64String = btoa(
          String.fromCharCode(...new Uint8Array(imageData)),
        );
        newPhoto = base64String;
        if (state.user.photo) {
          updateProfilePhoto(newPhoto);
        } else {
          addUserPhoto(newPhoto);
        }
      };
    };

    let openEditModal = () => {
      modal.value.showModal();
    };

    let closeEditModal = () => {
      modal.value.closeModal();
    };

    let editUserData = async () => {
      let response = await store.dispatch('editUserData', {
        ...state.newDetails,
        UserId: route.params.id,
        email: state.user.email,
      });
      if (response && response.status === 204) {
        state.user.name = state.newDetails.userName;
        state.user.phoneNumber = state.newDetails.phoneNumber;
        closeEditModal();
      }
    };

    watch(
      () => state.newDetails,
      () => {
        if (
          state.newDetails.userName === '' ||
          state.newDetails.phoneNumber.length < 10
        ) {
          state.editButtonState = true;
        } else {
          state.editButtonState = false;
        }
      },
      { deep: true },
    );

    onMounted(async () => {
      showLoading();
      let response = await store.dispatch('fetchUserProfileDetails', {
        id: route.params.id,
      });
      if (response && response.status === 200) {
        state.user = { ...response.data };
        state.newDetails.userName = response.data.name;
        state.newDetails.phoneNumber = response.data.phoneNumber;
      }
      hideLoading();
    });
    return {
      state,
      tabs,
      store,
      route,
      modal,
      changeTab,
      loading,
      showLoading,
      hideLoading,
      handleProfilePhoto,
      profilePhoto,
      openChangePhoto,
      openEditModal,
      editUserData,
    };
  },
};
</script>

<style scoped>
.user-profile {
  background-color: mintcream;
}
.info-row {
  @apply grid grid-cols-2;
  grid-template-columns: 70px auto;
}
</style>
