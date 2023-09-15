<template>
  <div class="container">
    <div class="">
      <div v-if="loading" class="absolute animate-ping top-1/3 left-1/2 bg-gray-800 rounded-full h-20 w-20">
      </div>
      <div class="mt-5 flex justify-between">
        <div
            class="inline-flex gap-2 items-center bg-white py-2 px-3 rounded-xl border focus-within:border-gray-800 transition-all duration-300 ease-in-out">
          <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_120_539)">
                <path
                    d="M8.33333 14.1667C11.555 14.1667 14.1667 11.555 14.1667 8.33333C14.1667 5.11167 11.555 2.5 8.33333 2.5C5.11167 2.5 2.5 5.11167 2.5 8.33333C2.5 11.555 5.11167 14.1667 8.33333 14.1667Z"
                    stroke="#B1B1B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.5 17.5L12.5 12.5" stroke="#B1B1B8" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_120_539">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <input type="text" class="bg-transparent outline-0" placeholder="Izlash..." @keyup="fetchData"
                 v-model="search">
        </div>
        <ButtonVButton class="flex group" @click="toggleModal({})">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9999 11.9999H4.00007" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M12 4V19.9999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
            </svg>
          </div>
          <span>Qo'shish</span>
        </ButtonVButton>
      </div>
    </div>
    <Table class="pt-5" v-if="!loading">
      <template #thead>
        <td data-orded>#</td>
        <td class="w-1/4 !text-left">Nomi</td>
        <td>Karobka</td>
        <td>Narx</td>
        <td>Qoldiq</td>
        <td>Amallar</td>
      </template>
      <template #tbody v-if="!loading">
        <tr v-for="(object, index) in objects.data" :key="index">
          <td class="px-6" scope="row">
            {{ calculateOrder(index) }}
          </td>
          <td class="!text-left" data-primary :title="object?.title">
            <span class="line-clamp-2 font-medium text-15p">
              {{ object?.title }}
            </span>
          </td>
          <td class="!w-max">{{ object?.count_in_box }}</td>
          <td class="!w-max">{{ object?.price }}</td>
          <td class="!w-max">{{ object?.stock_quantity }}</td>

          <td>
            <button class="text-xl text-primary" @click="toggleModal(object)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_40_3970)">
                  <path
                      d="M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15"
                      stroke="#3365FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M9 15H12L20.5 6.5C20.8978 6.10217 21.1213 5.56261 21.1213 5C21.1213 4.43739 20.8978 3.89782 20.5 3.5C20.1022 3.10217 19.5626 2.87868 19 2.87868C18.4374 2.87868 17.8978 3.10217 17.5 3.5L9 12V15Z"
                      stroke="#3365FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 5L19 8" stroke="#3365FC" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_40_3970">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </td>
        </tr>
      </template>
    </Table>
    <Transition name="fade">
      <div
          v-if="showModal"
          class="fixed top-0 left-0 w-full h-full z-50 bg-modal hidden opacity-0"
          :class="{ '!block opacity-100 overflow-hidden ': showModal }"
          @click="onClickOutside"
      >
        <ModalProducts
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 sm:max-w-[587px] w-[70%] sm:w-full modal-content"
            @close="toggleModal"
            @submitted="submitted"
            :show="showModal"
            :object="currentObject"
        />
      </div>
    </Transition>
    <div class="" v-if="!loading">
      <div class="page-size flex items-center">
        <label for="pageSize">Ko‘rsatish:</label>
        <select v-model="pageSize" id="pageSize" @change="updatePageSize" class="rounded-xl border">
          <option v-for="option in pageSizeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useApi} from "@/helpers/axios";
import {onMounted, ref, reactive, watch, computed} from 'vue';
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import Table from '@/components/CTable.vue'
import {useToast} from "vue-toastification";

const route = useRoute()
const router = useRouter()
const toast = useToast()

const showModal = ref(false)
const loading = ref(false)
const pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const pageSize = ref(10);
const currentPage = ref(1);
const search = ref('');

const objects = reactive({
  data: [],
  total: 0,
});
const currentObject = ref({})

function onClickOutside(event) {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent && !modalContent.contains(event.target)) {
    document.body.style.overflow = 'auto';
    showModal.value = false;
    currentObject.value = {}
  }
}

const toggleModal = (object) => {
  currentObject.value = object
  showModal.value = !showModal.value
}

const submitted = () => {
  toggleModal()
  fetchData()
}

const fetchData = async () => {
  loading.value = true
  try {
    const response = await useApi.get(`/products/?search=${search.value}&page=${currentPage.value}&page_size=${pageSize.value}`);
    console.log(response.results)
    objects.data = response.results;
    objects.total = response.count;
    console.log(objects.data)
  } catch (error) {
    console.error('Error fetching objects:', error);
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchData()
})

watch([pageSize, currentPage], () => {
  fetchData();
});

const calculateOrder = (index) => {
  return (currentPage.value - 1) * pageSize.value + index + 1;
};

const updatePageSize = () => {
  currentPage.value = 1;
  // fetchData();
  const query = {...route.query, page_size: pageSize.value};
  router.push({query});
};


</script>

<style scoped>

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem;
  margin: 0 0.2rem;
  border: none;
  background-color: transparent;
  color: #000;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
}

.page-size {
  margin-bottom: 1rem;
}

.page-size label {
  margin-right: 0.5rem;
}

.page-size select {
  padding: 0.5rem;
}
</style>