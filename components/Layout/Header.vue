<template>
  <div class="p-3 flex justify-end bg-gray-700 border-l border-white">
    <ButtonVButton @click="logOut">Log Out</ButtonVButton>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import { removeItem } from "@/service/localstorage";

const router = useRouter()
const logOut = () => {
  removeItem('access')
  router.push('/login')
}

</script>