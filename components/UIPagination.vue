<template>
  <nav
      class="isolate inline-flex space-x-2 rounded-md"
      aria-label="Pagination"
  >
    <a
        href="#"
        aria-current="page"
        class="rounded-md relative z-10 inline-flex items-center bg-gray-50 px-4 py-2 text-sm text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
    >
      Previous
    </a>
    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
    <button
        v-for="page in totalPages"
        :key="`page-${page}`"
        aria-current="page"
        class="rounded-md relative z-10 inline-flex items-center bg-gray-50 px-4 py-2 text-sm text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        :class="{
        'bg-purple-500 text-white': page === modelValue,
      }"
        @click="$emit('update:modelValue', page)"
    >
      {{ page }}
    </button>
    <a
        href="#"
        aria-current="page"
        class="rounded-md relative z-10 inline-flex items-center bg-gray-50 px-4 py-2 text-sm text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Next
    </a>
  </nav>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()

const props = defineProps({
  modelValue: {},
  totalPages: {
    required: true,
    type: Number,
  },
});

const pages = computed(() => {
  return Math.ceil(props.totalPages / size.value)
})
const size = ref(+route.query.size! || 10)
const page = ref(+route.query.page! || 1)

defineEmits(["input", "change", "update:modelValue"]);
</script>
