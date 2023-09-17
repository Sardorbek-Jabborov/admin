<template>
  <div class="container flex gap-5 py-5">
    <div class="basis-2/3 bg-white rounded-xl p-4">
      <Input placeholder="Izlash..." type="text" @input="fetchData" v-model="search"/>
      <div class="mt-3 flex justify-between border-b last:border-b-0 border-gray-600 pb-1"
           v-for="product in products.data"
           :key="product.id">
        <div>
          <p>Nomi: <span class="font-bold">{{ product?.title }}</span></p>
          <p>Qutidagi miqdori: <span class="font-bold">{{ product?.count_in_box }} dona</span></p>
          <p>Skladdagi soni: <span class="font-bold">{{ product?.stock_quantity }} dona</span></p>
        </div>
        <div class="flex flex-col gap-2">
          <p>Narxi: <span class="font-bold">{{ product?.price }} UZS</span></p>
          <ButtonVButton class="py-1" @click="addToBasket(product)">
            Savatga qo'shish
          </ButtonVButton>
        </div>
      </div>
    </div>
    <div class="basis-1/3 bg-white rounded-xl p-4">
      <h3 class="text-2xl text-black-100 font-medium">Savatcha</h3>
      <div v-if="basket.basket.products.length > 0" class="mt-2">
        <p>Savatchadagi mahsulotlar soni: <span class="text-lg font-bold">{{ basket.basket?.products?.length }}</span>
        </p>
        <div class="flex items-center gap-2 mt-2">
          <p>Savatchani tozalash</p>
          <button @click="clearBasket">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M19.6454 10.0047C19.3874 9.88994 16.9725 8.8149 16.7137 8.70016C15.4993 8.15956 14.0769 8.70632 13.5371 9.91997L20.8652 13.1813C21.4058 11.9669 20.8591 10.5445 19.6454 10.0047ZM21.4166 2.07743C21.0116 1.89723 20.5811 1.94343 20.4494 2.19063L16.9408 8.8011L19.3081 9.85381L21.9803 2.87138C22.0758 2.60802 21.8217 2.25763 21.4166 2.07743Z"
                  stroke="#3366FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M19.6772 14.2178C18.1732 18.7967 16.2264 21.167 16.2264 21.167C16.2264 21.167 9.52132 20.9237 5.17188 15.5546C6.06979 15.6186 11.6675 15.1373 13.5958 11.4185"
                  stroke="#3366FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M7.77051 18.0255C7.77051 18.0255 9.89439 17.7455 11.0341 16.5549C10.1223 18.2268 9.03653 18.861 9.03653 18.861L7.77051 18.0255ZM10.7646 19.6996C10.7646 19.6996 12.4349 19.7184 15.2765 17.1009C14.2546 19.4312 12.922 20.5622 12.922 20.5622L10.7646 19.6996Z"
                  stroke="#3366FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                  d="M3.20337 9.04437C3.27136 9.0162 3.34423 9.00171 3.41782 9.00171C3.49142 9.00171 3.56429 9.0162 3.63228 9.04437C3.70027 9.07253 3.76205 9.11381 3.81409 9.16585C3.86612 9.21788 3.9074 9.27966 3.93557 9.34765C3.96373 9.41564 3.97822 9.48852 3.97822 9.56211C3.97822 9.6357 3.96373 9.70858 3.93557 9.77657C3.9074 9.84456 3.86612 9.90634 3.81409 9.95837C3.76205 10.0104 3.70027 10.0517 3.63228 10.0799C3.56429 10.108 3.49142 10.1225 3.41782 10.1225C3.34423 10.1225 3.27136 10.108 3.20337 10.0799C3.13538 10.0517 3.0736 10.0104 3.02156 9.95837C2.96952 9.90634 2.92824 9.84456 2.90008 9.77657C2.87192 9.70858 2.85742 9.6357 2.85742 9.56211C2.85742 9.48852 2.87192 9.41564 2.90008 9.34765C2.92824 9.27966 2.96952 9.21788 3.02156 9.16585C3.0736 9.11381 3.13538 9.07253 3.20337 9.04437Z"
                  fill="#3366FF"/>
              <path
                  d="M4.83485 9.48473C4.90491 9.41467 4.99994 9.37531 5.09903 9.37531C5.19811 9.37531 5.29314 9.41467 5.3632 9.48473C5.43327 9.5548 5.47263 9.64983 5.47263 9.74891C5.47263 9.848 5.43327 9.94302 5.3632 10.0131C5.29314 10.0831 5.19811 10.1225 5.09903 10.1225C4.99994 10.1225 4.90491 10.0831 4.83485 10.0131C4.76479 9.94302 4.72543 9.848 4.72543 9.74891C4.72543 9.64983 4.76479 9.5548 4.83485 9.48473Z"
                  fill="#3366FF"/>
              <path
                  d="M4.25179 11.1433C4.42695 10.9681 4.66451 10.8697 4.91223 10.8697C5.15994 10.8697 5.39751 10.9681 5.57266 11.1433C5.74782 11.3184 5.84623 11.556 5.84623 11.8037C5.84623 12.0514 5.74782 12.289 5.57266 12.4642C5.39751 12.6393 5.15994 12.7377 4.91223 12.7377C4.66451 12.7377 4.42695 12.6393 4.25179 12.4642C4.07663 12.289 3.97822 12.0514 3.97822 11.8037C3.97822 11.556 4.07663 11.3184 4.25179 11.1433Z"
                  fill="#3366FF"/>
            </svg>
          </button>
        </div>
        <!-- Item -->
        <div
            class="mt-3 flex justify-between border-b border-gray-600 pb-1"
            v-for="basketItem in basket.basket.products"
            :key="basketItem?.id"
        >
          <div class="w-full">
            <p>Nomi: <span class="font-bold">{{ basketItem?.product.title }}</span></p>
              <p>Qutidagi miqdori: <span class="font-bold">{{ basketItem?.product.count_in_box }} dona</span></p>
            <p>Narxi: <span class="font-bold">{{ basketItem?.product.price }} UZS</span></p>
            <p>Savatdagi miqdori: <span class="font-bold">{{ basketItem?.quantity }} dona</span></p>
            <div class="flex items-center gap-5 p-2 w-auto">
              <div class="rounded-lg border border-gray-700 flex gap-2 w-auto">
                <button @click="basketItem.quantity > 1 ? basketItem.quantity-- : null"
                        class="px-4 py-2 bg-gray-200 rounded-l-lg border-r border-gray-700">-
                </button>
                <input type="number" v-model="basketItem.quantity" @input="updateQuantity(basketItem)" class="outline-0 max-w-[150px]"
                       min="0" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';">
                <button @click="basketItem.quantity++"
                        class="px-4 py-2 bg-gray-200 rounded-r-lg border-l border-gray-700">+
                </button>
              </div>
              <button @click="deleteItem(basketItem.product.id)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21" stroke="#FF4945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="#FF4945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11V17" stroke="#FF4945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11V17" stroke="#FF4945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="py-2 border-b border-gray-700">
          Umumiy narxi: {{ totalPrice }} UZS
        </div>
        <div class="flex flex-col gap-2">
          <label for="customers">Mijoz:</label>
          <select name="customers" class="border border-gray-600 rounded- md p-2">
            <option disabled selected value>Tanlang:</option>
            <option v-for="consumer in consumers.data" :value="consumer.id">{{ consumer.fio }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="customers">Kuryer:</label>
          <select name="customers" class="border border-gray-600 rounded- md p-2">
            <option disabled selected value>Tanlang:</option>
            <option v-for="courier in couriers.data" :value="courier.id">{{ courier.fio }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-2 mt-5">
          <ButtonVButton class="py-1">
            Buyurtma yaratish
          </ButtonVButton>
          <ButtonVButton class="py-1">
            Check
          </ButtonVButton>
        </div>
      </div>
      <div v-else>
        <p>Savatchada hech narsa yo'q.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useApi} from "@/helpers/axios";
import {onMounted, ref, reactive, watch, computed} from 'vue';
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import Table from '@/components/CTable.vue'
import {useProductStore} from "~/store/product";
import {useBasketStore} from "~/store/basket";
import {useToast} from "vue-toastification";

const store = useProductStore()
const basket = useBasketStore()
const toast = useToast()

const products = reactive({
  "data": []
})
const search = ref('')

const fetchData = async () => {
  // loading.value = true
  try {
    const response = await store.getProductAll(search.value, 1, 5)
    products.data = response.results;
    console.log(products.data)
  } catch (error) {
    toast.error("Error fetching objects")
    console.error('Error fetching objects:', error);
  } finally {
    // loading.value = false
  }
}
onMounted(() => {
  fetchData()
})

const updateQuantity = (item: any) => {
  let newValue = parseInt(item.quantity, 10) || 0;
  newValue = Math.max(0, newValue); // Ensure it doesn't go below 1
  item.quantity = newValue.toString(); // Convert back to string for input field
};


const consumers = reactive({"data": []})

const couriers = reactive({"data": []})

async function load_page() {
  try {
    const response = await useApi.get('/consumers/?page_size=100');
    consumers.data = response.results;
  } catch (error) {
    console.error('Error fetching objects:', error);
  }

  try {
    const response = await useApi.get('/couriers/?page_size=100');
    couriers.data = response.results;
  } catch (error) {
    console.error('Error fetching objects:', error);
  }
}

onMounted(load_page)

const clearBasket = () => {
  basket.products = []
}

const deleteItem = (id: number) => {
  basket.removeItem(id)
};


const totalPrice = computed(() => {
  return basket.basket.products.reduce((total, basketItem) => {
    return total + (basketItem.product.price * basketItem.quantity);
  }, 0);
});

// const addToBasket = (id: number) => {
//   const item = products.data.find((el) => el.id == id);
//   const existingItem = basket.products.find((basketItem) => basketItem.product.id === id);
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     basket.products.push({
//       "product": item,
//       "quantity": 1,
//     });
//   }
//   console.log(basket.products);
// };
const addToBasket = (item) => {
  basket.addToBasket(item);
  console.log(basket.basket)
  console.log(basket.basket.products)
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>