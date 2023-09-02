<template>
  <div class="container flex gap-5 py-5">
    <div class="basis-2/3 bg-white rounded-xl p-4">
      <Input placeholder="Izlash..." type="text"/>
      <div class="mt-3 flex justify-between border-b last:border-b-0 border-gray-600 pb-1" v-for="product in products"
           :key="product.id">
        <div>
          <p>Nomi: <span class="font-bold">{{ product.name }}</span></p>
          <p>Qutidagi miqdori: <span class="font-bold">{{ product.amount }} dona</span></p>
          <p>Skladdagi soni: <span class="font-bold">{{ product.perbox }} dona</span></p>
        </div>
        <div class="flex flex-col gap-2">
          <p>Narxi: <span class="font-bold">{{ product.price }} UZS</span></p>
          <ButtonVButton class="py-1" @click="addToBasket(product.id)">
            Savatga qo'shish
          </ButtonVButton>
        </div>
      </div>
    </div>
    <div class="basis-1/3 bg-white rounded-xl p-4">
      <h3 class="text-2xl text-black-100 font-medium">Savatcha</h3>
      <div v-if="basket.products.length > 0">
        <p>Savatchadagi mahsulotlar soni: <span class="text-lg font-bold">{{ basket?.products?.length }}</span></p>
        <div
            class="mt-3 flex justify-between border-b border-gray-600 pb-1"
            v-for="basketItem in basket.products"
            :key="basketItem.product.id"
        >
          <div>
            <p>Nomi: <span class="font-bold">{{ basketItem.product.name }}</span></p>
            <p>Qutidagi miqdori: <span class="font-bold">{{ basketItem.product.amount }} dona</span></p>
          </div>
          <div class="flex flex-col gap-2">
            <p>Narxi: <span class="font-bold">{{ basketItem.product.price }} UZS</span></p>
            <p>Savatdagi miqdori: <span class="font-bold">{{ basketItem.quantity }} dona</span></p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Savatchada hech narsa yo'q.</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="customers">Mijoz:</label>
        <select name="customers" class="border border-gray-600 rounded- md p-2">
          <option disabled selected value>Tanlang:</option>
          <option v-for="consumer in consumers" :value="consumer.id">{{consumer.fio}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const products = [
  {
    id: 1,
    name: "Tovar 1",
    perbox: 15,
    amount: 4565,
    price: 15999,
  },
  {
    id: 2,
    name: "Tovar 2",
    perbox: 23,
    amount: 156,
    price: 6500,
  },
  {
    id: 3,
    name: "Tovar 3",
    perbox: 8,
    amount: 48562,
    price: 84561,
  },
  {
    id: 4,
    name: "Tovar 4",
    perbox: 456,
    amount: 564,
    price: 156166,
  },
  {
    id: 5,
    name: "Tovar 5",
    perbox: 23,
    amount: 98465,
    price: 87777,
  }
]

const basket = reactive({
      "products": [],
    }
)

const consumers = reactive([
  {
    "id": 1,
    "fio": "Vali"
  },
  {
    "id": 2,
    "fio": "QodirAli"
  },
  {
    "id": 3,
    "fio": "BehzodAka ..."
  }
])

const addToBasket = (id: number) => {
  const item = products.find((el) => el.id == id);
  const existingItem = basket.products.find((basketItem) => basketItem.product.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.products.push({
      "product": item,
      "quantity": 1,
    });
  }
  console.log(basket.products);
};
</script>