import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {useToast} from "vue-toastification";
import {useApi} from "~/helpers/axios";

const toast = useToast()

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const productLabels = ref<string[]>([])
    const productCount = ref<number[]>([])
    const slug = ref<string>('product')

    const addProduct = async (product: any): Promise<void> => {
        await useApi.post("/products/", {
            title: product.title,
            price: product.price,
            count_in_box: product.count_in_box
        })
        toast.success("Yangi mahsulot qo'shildi")
    }

    const editProduct = async (product: any) => {
        await useApi.put("/products/", {
            title: product.title,
            price: product.price,
            count_in_box: product.count_in_box
        })
        toast.info("Mahsulot yangilandi")
    }

    const editStatusProduct = async (product: Product): Promise<void> => {

        toast.success("Turkum xarakteristikasi o'zgartirildi")
    }

    const getProduct = async (): Promise<void> => {

    }

    const getProductAll = async (): Promise<void> => {

    }

    const removeProduct = async (id: number): Promise<void> => {

        toast.warning("Mahsulot o'chirildi")
    }

    const getOneProduct = async (id: number) => {

    }

    return {
        products,
        productLabels,
        productCount,

        addProduct,
        getProduct,
        getProductAll,
        editProduct,
        getOneProduct,
        removeProduct,
        editStatusProduct,
    }
})