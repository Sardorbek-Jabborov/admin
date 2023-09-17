import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useToast} from "vue-toastification";
import {useApi} from "~/helpers/axios";
import {setItem, getItem} from "~/service/localstorage"

const toast = useToast()

export const useUserStore = defineStore('user', () => {
    const user = ref('')

    const setUserName = (username: string) => {
        localStorage.setItem('username', user.value)
        user.value = username
        console.log(user)
    }

    const getUserName = () => {
        const username = getItem('username')
        console.log(username)
        return username
    }

    return {
        setUserName,
        getUserName
    }
})

