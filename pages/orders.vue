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
        <ButtonVButton class="flex group" @click="router.push('/create')">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9999 11.9999H4.00007" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
              <path d="M12 4V19.9999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="group-hover:stroke-blue-300 transition-all duration-300 ease-in-out"/>
            </svg>
          </div>
          <span>Yaratish</span>
        </ButtonVButton>
      </div>
    </div>
    <Table class="pt-5" v-if="!loading">
      <template #thead>
        <td data-orded>#</td>
        <td class="!text-left">Mijoz</td>
        <td>Tel. raqami</td>
        <td>Kuryer</td>
        <td>Tel. raqami</td>
        <td>To'langan summa</td>
        <td>Umumiy summa</td>
        <td>Status</td>
        <td>Yaratilgan sana</td>
      </template>
      <template #tbody v-if="!loading">
        <tr v-for="(sponsor, index) in sponsors.data" :key="index">
<!--          <pre>{{sponsor}}</pre>-->
          <td class="px-6" scope="row">
            {{ calculateOrder(index) }}
          </td>
          <td class="!text-left " data-primary :title="sponsor?.full_name">
            <span class="line-clamp-2 font-medium text-15p">
              {{ sponsor?.consumer.fio }}
            </span>
          </td>
          <td class="!w-max">{{ sponsor?.consumer.phone_number }}</td>
          <td class="!w-max">{{ sponsor?.courier.fio }}</td>
          <td class="!w-max">{{ sponsor?.courier.phone_number }} uzs</td>
          <td class="!w-max">{{ sponsor?.paid_price }}</td>
          <td class="!w-max">{{ sponsor?.total_price }}</td>
          <td class="!w-max">{{ sponsor?.status }}</td>
          <td class="!w-max">{{ sponsor?.created_at }}</td>
        </tr>
      </template>
    </Table>
    <div class="" v-if="!loading">
      <div class="page-size flex items-center justify-between">
        <div>
          <label for="pageSize">Ko‘rsatish:</label>
          <select v-model="pageSize" id="pageSize" @change="updatePageSize" class="rounded-xl border">
            <option v-for="option in pageSizeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <UIPagination :total-pages="sponsors.total"/>
        </div>
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

const route = useRoute()
const router = useRouter()

const showModal = ref(false)
const loading = ref(false)
const pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const pageSize = ref(10);
const currentPage = ref(1);
const search = ref('');

const sponsors = reactive({
  data: [],
  total: 0,
});
const current_consumer = ref({})

function onClickOutside(event) {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent && !modalContent.contains(event.target)) {
    document.body.style.overflow = 'auto';
    showModal.value = false;
    current_consumer.value = {}
  }
}

const toggleModal = (sponsor) => {
  current_consumer.value = sponsor
  showModal.value = !showModal.value
}

const fetchData = async () => {
  loading.value = true
  try {
    const response = await useApi.get(`/orders/?search=${search.value}&page=${currentPage.value}&page_size=${pageSize.value}`);
    console.log(response.results)
    sponsors.data = response.results;
    sponsors.total = response.count;
    console.log(sponsors.data)
  } catch (error) {
    console.error('Error fetching orders:', error);
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

const totalPages = computed(() => Math.ceil(sponsors.data.length / pageSize.value));


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