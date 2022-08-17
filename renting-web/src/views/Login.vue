<template>
  <div class="register flex place-content-center mb-14">
    <div class="register-card shadow-2xl p-8">
      <p class="text-2xl font-semibold text-center">Login</p>
      <form
        class="w-full flex flex-col gap-8 mt-10"
        onsubmit="return false"
        ref="form"
      >
        <input
          type="email"
          maxlength="100"
          v-model="state.user.email"
          placeholder="Email"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />

        <input
          type="password"
          maxlength="100"
          v-model="state.user.password"
          placeholder="Password"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />

        <p v-if="state.errorMessage" class="text-sm font-semibold text-red-600">
          {{ state.errorMessage }}
        </p>
        <input ref="submit" type="submit" class="hidden" />
      </form>
      <primary-button
        text="Login"
        class="place-content-center w-5/6 mt-14 m-auto"
        :disabled="state.buttonState"
        @click="authenticateUser"
      ></primary-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';

import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import { watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
export default {
  name: 'Register',
  components: { PrimaryButton },
  setup() {
    let state = reactive({
      user: {
        email: '',
        password: '',
      },
      buttonState: true,
    });
    let submit = ref(null);
    let form = ref(null);
    let store = useStore();
    const router = useRouter();
    let authenticateUser = async () => {
      submit.value.click();
      if (form.value.checkValidity()) {
        let response = await store.dispatch('authenticateUser', state.user);
        if (response && response.status === 200) {
          Swal.fire({
            title: 'Logged in!',
            icon: 'success',
          }).then(function () {
            router.push('/');
          });
        }
      }
    };
    let validateInputs = () => {
      return state.user.email.length > 0 && state.user.password.length >= 8;
    };
    watch(
      () => state.user,
      () => {
        state.buttonState = !validateInputs();
      },
      { deep: true },
    );
    return { state, submit, form, authenticateUser };
  },
};
</script>

<style scoped>
.register-card {
  width: 500px;
}
</style>
