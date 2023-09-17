import {defineStore} from 'pinia'
import {reactive, ref} from 'vue'
import {useToast} from "vue-toastification";
import {useApi} from "~/helpers/axios";

const toast = useToast()

export const useBasketStore = defineStore('basket', () => {
    const basket = reactive({
        products: [],
    });

    const addToBasket = (item) => {
        console.log(item);
        const existingItem = basket.products.find((basketItem) => basketItem.product.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            basket.products.push({
                product: item,
                quantity: 1,
            });
        }
    };

    const removeItem = (id: number) => {
        const indexOfItem = basket.products.findIndex((basketItem) => basketItem.product.id === id);
        if (indexOfItem !== -1) {
            basket.products = basket.products.filter((basketItem) => basketItem.product.id !== id);
        } else {
            console.warn(`Item with id ${id} not found in the basket.`);
        }
        console.log(basket.products);
    };

    return {
        basket,
        addToBasket,
        removeItem
    };
});
