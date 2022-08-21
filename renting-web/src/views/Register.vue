<template>
  <div class="register flex place-content-center mb-14">
    <div class="register-card shadow-2xl p-8">
      <p class="text-2xl font-semibold text-center">Register</p>
      <form
        class="w-full flex flex-col gap-8 mt-10"
        onsubmit="return false"
        ref="form"
      >
        <input
          type="text"
          maxlength="100"
          v-model="state.user.username"
          placeholder="Username"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <input
          type="email"
          maxlength="100"
          v-model="state.user.email"
          placeholder="Email"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <input
          type="tel"
          v-model="state.user.phoneNumber"
          placeholder="Phone number"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <input
          type="password"
          pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          maxlength="100"
          v-model="state.user.password"
          placeholder="Password"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <input
          type="password"
          pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          maxlength="100"
          v-model="state.user.confirmPass"
          placeholder="Confirm Password"
          class="h-10 text-lg p-1 border-0 border-b-2 outline-none focus-within:border-green-600"
        />
        <p class="text-gray-500 text-sm font-semibold">
          *The password must have at least one small letter, one capital letter,
          one number, one symbol and 8 characters.
        </p>
        <p v-if="state.errorMessage" class="text-sm font-semibold text-red-600">
          {{ state.errorMessage }}
        </p>
        <input ref="submit" type="submit" class="hidden" />
      </form>
      <primary-button
        text="Sign up"
        class="place-content-center w-5/6 mt-14 m-auto"
        :disabled="state.buttonState"
        @click="registerUser"
      ></primary-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import { watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
export default {
  name: 'Register',
  components: { PrimaryButton },
  setup() {
    let state = reactive({
      user: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        confirmPass: '',
      },
      errorMessage: '',
      buttonState: true,
    });
    let submit = ref(null);
    let form = ref(null);
    const router = useRouter();
    const store = useStore();
    let registerUser = async () => {
      submit.value.click();
      if (form.value.checkValidity()) {
        let response = await store.dispatch('registeruser', state.user);
        if (response && response.status === 200) {
          Swal.fire({
            title: 'Good job!',
            text: 'Your account has been created!',
            icon: 'success',
          }).then(function () {
            router.push('/login');
          });
          return;
        }
        state.errorMessage = response.data.message;
      }
    };

    let validatePassword = () => {
      if (
        state.user.password === state.user.confirmPass &&
        state.user.password.length >= 8 &&
        state.user.password !== '' &&
        state.user.username !== '' &&
        state.user.email !== '' &&
        state.user.phoneNumber !== ''
      ) {
        return false;
      }
      return true;
    };

    watch(
      () => state.user,
      () => {
        state.buttonState = validatePassword();
        state.errorMessage = '';
      },
      { deep: true },
    );
    return { state, submit, registerUser, form };
  },
};
</script>

<style scoped>
.register-card {
  width: 500px;
}
</style>
