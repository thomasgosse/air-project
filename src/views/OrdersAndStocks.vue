<template>
  <Page title="Orders and Stocks">
    <div class="page__content">
      <div class="page__content--wrapper">
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
.page__content {
  overflow-x: auto;

  &--wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  table {
    flex: 1;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 14px;
    font-family: sans-serif;

    border-radius: 8px;
    overflow: hidden;
    margin: 0 20px 40px 10px;

    th {
      background-color: var(--primary);
      color: var(--background);
      text-align: left;
    }

    th,
    td {
      padding: 12px 15px;
    }

    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    tbody tr:last-of-type {
      border-bottom: 2px solid var(--primary);
    }
  }
}

@media screen and (max-width: 1000px) {
  .page__content {
    flex-direction: column;
  }
}
</style>
