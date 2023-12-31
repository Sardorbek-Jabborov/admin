<template>
  <div class="p-7 bg-white rounded-xl max-w-[586px]">
    <div class="flex justify-between pb-7 border-b border-gray-100">
      <p class="text-2xl font-bold text-blue-700">{{ props.object?.id ? "Tahrirlash" : "Qo'shish" }}</p>
      <button @click='close'>
        <IconsClose class="text-[#B2B7C1] w-6 h-6 hover:text-red duration-300"/>
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
            <IconsSave class="w-6 h-6 text-[white] group-hover:text-blue-300 duration-300"/>
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
      store.addProduct(form, () => emit("submitted"))
    } else {
      store.editProduct(form, props.object.id, () => emit("submitted"))
    }
  }
  emit('close')
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
