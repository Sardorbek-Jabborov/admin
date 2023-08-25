<template>
  <div class="p-7 bg-white rounded-xl max-w-[586px]">
    <div class="flex justify-between pb-7 border-b border-gray-100">
      <p class="text-2xl font-bold text-blue-700">Tahrirlash</p>
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
            label="F.I.Sh. (Familiya Ism Sharifingiz)"
            placeholder="Ism ..."
            type="text"
            :error="$v.name.$error"
            v-model="form.name"
        />
        <ClientOnly>
          <Input
              label="Telefon raqami"
              type="phone"
              placeholder=""
              v-model="form.phoneNumber"
              src="/icons/flag.svg"
              v-maska="'## ### ## ##'"
              :error="$v.phoneNumber.$error"
          >+998</Input
          >
        </ClientOnly>
        <ClientOnly>
          <Input
              label="Qo'shimcha telefon raqami"
              type="phone"
              placeholder=""
              v-model="form.addPhoneNumber"
              src="/icons/flag.svg"
              v-maska="'## ### ## ##'"
              :error="$v.phoneNumber.$error"
          >+998</Input
          >
        </ClientOnly>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {reactive, ref} from 'vue'

interface Props {
  show: boolean
}

const name = ref('')
const phone_number = ref('')
const message = ref('')

interface IContactForm {
  name?: string
  phoneNumber?: string
  addPhoneNumber?: string
  message?: string
  agreement?: boolean
}

const userPrivacy = ref(
    `${import.meta.env.VITE_APP_ID_URL}/help-center/privacy-policy`
)
const form = reactive<IContactForm>({
  name: '',
  phoneNumber: '',
  addPhoneNumber: '',
  message: '',
  agreement: false,
})

const isTrue = (val: boolean) => {
  return val === true
}

const validPhones = [
  '90',
  '91',
  '33',
  '50',
  '93',
  '94',
  '88',
  '95',
  '97',
  '98',
  '99',
  '20',
  '77',
]

const isValidPhone = (val: string) => {
  const phone = val.replace(/[\s)(-]/g, '')
  return phone.length === 9 && validPhones.includes(phone.substring(0, 2))
}
const rules = {
  phoneNumber: {
    required,
    isValidPhone,
  },
  name: {
    required,
  },
  message: {
    required,
  },
  agreement: {
    required,
    isTrue,
  },
}

const $v = useVuelidate<IContactForm>(rules, form)
const emit = defineEmits(['open', 'close'])
const submitForm = () => {
  $v.value.$touch()
  if ($v.value.$invalid) {
    console.log($v.value.$error)
  } else {
    console.log("hi")
  }
}

const props = defineProps<Props>()


function close() {
  console.log("close")
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
