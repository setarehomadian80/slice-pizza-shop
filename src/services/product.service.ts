import api from "@/lib/axios/axios";
import type { Pizza } from "@/types/product";

export const productService = {

  getProducts: async (): Promise<Pizza[]> => {
    const { data } = await api.get<Pizza[]>("/item");
    return data;
  },
  
};