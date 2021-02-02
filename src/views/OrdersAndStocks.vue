<template>
  <Page title="Orders and Stocks">
    <div class="page__content">
      <order-table
        title="Orders"
        :headers="['#', 'Customers', 'Products']"
        :items="orders"
      ></order-table>
      <stock-table
        title="Stock"
        :headers="['Products', 'Villeneuve', 'Roncq', 'Lesquin']"
        :items="stocks"
      ></stock-table>
    </div>
  </Page>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { State } from "@/store/index";
import Page from "@/components/Page.vue";
import OrderTable from "@/components/OrderTable.vue";
import StockTable from "@/components/StockTable.vue";

export default defineComponent({
  name: "OrdersAndStocks",
  components: {
    Page,
    "order-table": OrderTable,
    "stock-table": StockTable
  },
  setup() {
    const store = useStore<State>();
    const stocks = computed(() => store.state.stocks);
    const orders = computed(() => store.state.orders);
    return { stocks, orders };
  }
});
</script>

<style lang="scss" scoped>
.page__content {
  display: flex;

  table {
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .page__content {
    flex-direction: column;
  }
}
</style>
