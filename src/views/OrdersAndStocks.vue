<template>
  <Page title="Orders and Stocks">
    <div class="orderstock__content">
      <div class="orderstock__content--wrapper">
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

<style lang="scss">
.orderstock__content {
  overflow-x: auto;

  &--wrapper {
    display: flex;
    flex-wrap: wrap;

    table {
      margin: 0 20px 40px 10px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .orderstock__content {
    flex-direction: column;

    table {
      margin: 0 0 40px 0;
    }
  }
}
</style>
