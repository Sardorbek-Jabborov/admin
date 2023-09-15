<template>
  <div class="p-7 bg-white rounded-xl max-w-[586px]">
    <div class="flex justify-between pb-7 border-b border-gray-100">
      <p class="text-2xl font-bold text-blue-700">{{ props.object?.id ? "Tahrirlash" : "Qo'shish" }}</p>
      <button @click='close'>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7L7 21" stroke="#B2B7C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 7L21 21" stroke="#B2B7C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <form @submit.prevent="submitForm">
      <div class="md:mt-5 sm:mt-4 mt-2 flex flex-col md:gap-6 sm:gap-4 gap-2">
        <Input
            label="Nom"
            placeholder="Nom ..."
            type="text"
            :error="$v.title.$error"
            v-model="form.title"
        />
        <ClientOnly>
          <Input
              label="Narx"
              type="number"
              placeholder=""
              v-model="form.price"
              src="/icons/flag.svg"
              v-maska="'## ### ## ##'"
              :error="$v.price.$error"
          />
        </ClientOnly>
        <ClientOnly>
          <Input
              label="Karobka"
              type="count_in_box"
              placeholder=""
              v-model="form.count_in_box"
              src="/icons/flag.svg"
              v-maska="'## ### ## ##'"
              :error="$v.count_in_box.$error"
          />
        </ClientOnly>
      </div>
      <div class="mt-3 flex justify-end">
        <ButtonVButton class="flex gap-2 group">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M17 21V13H7V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M7 3V8H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
            </svg>
          </div>
          Saqlash
        </ButtonVButton>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useApi} from "@/helpers/axios";
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {reactive, ref} from 'vue'
import {useProductStore} from "~/store/product";


const props = defineProps<Props>()
const store = useProductStore()

interface Props {
  show: boolean
  object: any
}

interface IContactForm {
  title?: string
  price?: number
  count_in_box?: number
}

const form = reactive<IContactForm>({
  title: props.object?.title,
  price: props.object?.price,
  count_in_box: props.object?.count_in_box,
})

const rules = {
  title: {
    required,
  },
  price: {
    required,
  },
  count_in_box: {
    required,
  }
}


const $v = useVuelidate<IContactForm>(rules, form)
const emit = defineEmits(['open', 'close', 'submitted'])

const submitForm = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    console.log($v.value.$error)
  } else {
    const method = props.object?.id ? 'put' : 'post'
    if (method == 'post') {
      store.addProduct(form)
    } else {
      store.editProduct(form)
    }
  }
  emit("submitted")
}


function close() {
  emit('close')
  document.body.style.overflow = 'auto'
}

watch(
    () => props.show,
    (first) => {
      if (process.client) {
        const body = document.body

        if (body) {
          if (first) {
            body.style.overflow = 'hidden'
          } else {
            body.style.overflow = 'auto'
          }
        }
      }
    },
    {
      immediate: true,
    }
)
</script>

<style>
input {
  transition: 300ms ease-in-out;
}

input:focus::selection {
  background-color: #3490dc; /* Background color */
  color: white; /* Text color */
}

/* Style the caret when the input is focused and the cursor is at the beginning */
input:focus::selection,
input:focus::selection {
  background-color: #3490dc; /* Background color */
  color: white; /* Text color */
}
</style>
