<script setup>

import {ref} from "vue";
import {tokenStore} from "../main";
import {authorize} from "../api/bexNote";

const visible = ref(true);
const username = ref();
const password = ref();

const closeCallback = async () => {
  tokenStore.$patch({
    token: await authorize(username.value, password.value)
  });
  visible.value = false;
}
</script>

<template>
  <prime-dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm"
                :closable="false">
    <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl">
      <div class="inline-flex flex-col gap-2">
        <label for="username" class="text-primary-50 font-semibold">Username</label>
        <prime-input id="username" v-model="username"></prime-input>
      </div>
      <div class="inline-flex flex-col gap-2">
        <label for="password" class="text-primary-50 font-semibold">Password</label>
        <prime-input id="password"
                     v-model="password"
                     type="password"></prime-input>
      </div>
      <div class="flex items-center gap-4">
        <prime-button label="Sign-In" @click="closeCallback" variant="text"
                      class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></prime-button>
      </div>
    </div>
  </prime-dialog>
</template>

<style scoped>

</style>