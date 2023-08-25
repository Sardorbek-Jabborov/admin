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
            :error="$v.fio.$error"
            v-model="form.fio"
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
              v-model="form.phoneNumber2"
              src="/icons/flag.svg"
              v-maska="'## ### ## ##'"
              :error="$v.phoneNumber2.$error"
          >+998</Input
          >
        </ClientOnly>
      </div>
      <div class="mt-3 flex justify-end">
        <ButtonVButton class="flex gap-2 group">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M17 21V13H7V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M7 3V8H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
            </svg>
          </div>
          Saqlash
        </ButtonVButton>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {reactive, ref} from 'vue'

const props = defineProps<Props>()

interface Props {
  show: boolean
  consumer: any
}

interface IContactForm {
  fio?: string
  phoneNumber?: string
  phoneNumber2?: string
}

const form = reactive<IContactForm>({
  fio: props.consumer?.fio,
  phoneNumber: props.consumer?.phone_number?.slice(4, 13),
  phoneNumber2: props.consumer?.phone_number2?.slice(4, 13),
})

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
  fio: {
    required,
  },
  phoneNumber2: {
    isValidPhone,
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
