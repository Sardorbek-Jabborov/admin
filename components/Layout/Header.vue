<template>
  <div class="p-3 flex items-center justify-end bg-gray-700 border-l border-white">
    <p class="mr-6 text-white font-medium text-lg rounded-md px-2 border border-white">{{username}}</p>
    <ButtonVButton @click="logOut" class="flex flex-row items-center gap-2 group">
      <span>Log Out</span>
      <IconsLogout class="h-6 w-6 text-white group-hover:text-blue-300 duration-300"/>
    </ButtonVButton>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {getItem ,removeItem} from "@/service/localstorage";
import {useUserStore} from "~/store/user";

const user = useUserStore()

const username = getItem('username')
console.log(username)

const router = useRouter()
const logOut = () => {
  removeItem('username')
  removeItem('access')
  router.push('/login')
}

</script>