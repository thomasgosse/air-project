<template>
  <table>
    <tr>
      <th>Products</th>
      <th v-for="store in stores" :key="store">
        {{ store }}
      </th>
    </tr>
    <tr v-for="productStock in getProductStocks()" :key="productStock.id">
      <th>{{ productStock.id }}</th>
      <th v-for="stock in productStock.stocksByStore" :key="stock">
        {{ stock }}
      </th>
    </tr>
  </table>
</template>

<script lang="ts">
import { Stock } from "@/types";
import { defineComponent, PropType } from "vue";

type Product = {
  storeId: string;
  productId: string;
  quantity: number;
};

type ProductStock = {
  id: string;
  stocksByStore: number[];
};

export default defineComponent({
  name: "Page",
  props: {
    items: {
      type: Array as PropType<Stock[]>,
      required: true
    }
  },
  data() {
    return {
      dataItems: this.items
    };
  },
  computed: {
    stores(): string[] {
      return this.dataItems.map(item => item.id);
    },
    products(): Product[] {
      return this.dataItems.flatMap(item =>
        item.stock.map(s => ({ ...s, storeId: item.id }))
      );
    },
    uniqueProductNames(): string[] {
      const productNames = this.dataItems.flatMap(item =>
        item.stock.map(s => s.productId)
      );
      return Array.from(new Set(productNames));
    }
  },
  methods: {
    getProductStocks(): ProductStock[] {
      const productStocks: ProductStock[] = [];

      this.uniqueProductNames.forEach(product => {
        const stocks: number[] = [];
        this.stores.forEach(store => {
          const findProduct = this.products.find(
            (it: any) => it.productId == product && it.storeId == store
          );
          stocks.push(findProduct ? findProduct.quantity : 0);
        });
        productStocks.push({ id: product, stocksByStore: stocks });
      });

      return productStocks;
    }
  }
});
</script>