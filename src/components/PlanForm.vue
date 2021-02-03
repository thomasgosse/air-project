<template>
  <form @submit="submit">
    <label>Pick an order</label>
    <select v-model="selectedOrder" @change="resetAll" required>
      <option disabled value="_">Pick an order</option>
      <option
        v-for="order in orders"
        :key="order.id"
        :value="{ id: order.id, customerId: order.customerId }"
      >
        {{ order.id }} (for {{ order.customerId }})
      </option>
    </select>

    <label>Select an item from the order</label>
    <select
      v-model="selectedItem"
      :disabled="!selectedOrder.id"
      @change="resetStoreDrone"
      required
    >
      <option disabled value="_">Product from {{ selectedOrder.id }}</option>
      <option
        v-for="item in getBasketItems(selectedOrder.id)"
        :key="item.productId"
        :value="item.productId"
        :disabled="item.quantity === 0"
      >
        {{ item.productId }} (left in order: {{ item.quantity }})
      </option>
    </select>

    <label>Chose a store</label>
    <select
      v-model="selectedStore"
      :disabled="!selectedItem"
      @change="resetDrone"
      required
    >
      <option disabled value="_">Pick a store</option>
      <option
        v-for="stock in stores"
        :key="stock.id"
        :value="stock.id"
        :disabled="!hasProductInStock(stock)"
      >
        {{ stock.id }}
        {{ hasProductInStock(stock) ? "" : "- no more stock" }}
      </option>
    </select>

    <label>Chose the delivery drone</label>
    <select v-model="selectedDrone" :disabled="!selectedStore" required>
      <option disabled value="_">Pick the delivery drone</option>
      <option
        v-for="drone in drones"
        :key="drone.id"
        :value="{ id: drone.id, energyCost: getEnergyCost(drone) }"
        :disabled="!isDroneAvailable(drone)"
        required
      >
        {{ drone.id }} {{ isDroneAvailable(drone) ? "" : "- no more autonomy" }}
      </option>
    </select>

    <p v-if="selectedItem && selectedStore && selectedDrone.id">
      You're about to deliver <b>1x {{ selectedItem }}</b
      >, from <b>{{ selectedStore }}</b> store, using
      <b>drone {{ selectedDrone.id }}</b>
    </p>
    <p v-if="selectedDrone.energyCost && selectedDrone.id">
      This action will use
      <b
        >{{ selectedDrone.energyCost.toFixed(2) }}% of {{ selectedDrone.id }}'s
        autonomy</b
      >
    </p>
    <button type="submit">Create</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { State } from "@/store/index";
import { Drone, Store, Item, Plan, Order } from "@/types";
import { getTotalDistance } from "@/services/distance-service";

const MAX_DRONE_CAPACITY = 100;

export default defineComponent({
  name: "PlanForm",
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedOrder: { id: "", customerId: "" },
      selectedItem: "",
      selectedDrone: { id: "", energyCost: 0 },
      selectedStore: ""
    };
  },
  computed: {
    draftPlan(): Plan {
      return {
        productId: this.selectedItem,
        customerId: this.selectedOrder.customerId,
        drone: this.selectedDrone.id,
        store: this.selectedStore
      };
    }
  },
  setup() {
    const store = useStore<State>();
    const drones = computed(() => store.state.drones);
    const orders = computed(
      () => store.getters.ordersEmptyItemFiltered as Order[]
    );
    const customers = computed(() => store.state.customers);
    const stores = computed(() => store.state.stores);
    const createPlan = (draftPlan: Plan, orderId: string, energyCost: number) =>
      store.dispatch("createPlan", { draftPlan, orderId, energyCost });

    return { drones, orders, customers, stores, createPlan };
  },
  methods: {
    async submit(e: Event) {
      e.preventDefault();
      this.createPlan(
        this.draftPlan,
        this.selectedOrder.id,
        this.selectedDrone.energyCost
      );
      this.closeModal();
    },
    resetAll() {
      this.selectedItem = "";
      this.selectedStore = "";
      this.selectedDrone = { id: "", energyCost: 0 };
    },
    resetStoreDrone() {
      this.selectedStore = "";
      this.selectedDrone = { id: "", energyCost: 0 };
    },
    resetDrone() {
      this.selectedDrone = { id: "", energyCost: 0 };
    },
    getBasketItems(orderId: string): Item[] {
      const order = this.orders.find(order => order.id === orderId);
      return order ? order.basket : [];
    },
    hasProductInStock(store: Store): boolean {
      const product = store.stock.find(s => s.productId == this.selectedItem);
      return product ? product.quantity >= 1 : false;
    },
    isDroneAvailable(drone: Drone) {
      return drone.autonomy - this.getEnergyCost(drone) >= 0;
    },
    getEnergyCost(drone: Drone): number {
      const customer = this.customers.find(
        c => c.id === this.selectedOrder.customerId
      );
      const store = this.stores.find(s => s.id === this.selectedStore);
      if (!customer || !store) return MAX_DRONE_CAPACITY;

      return getTotalDistance(drone, store, customer);
    }
  }
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;

  button[type="submit"] {
    margin-top: 15px;
  }

  select {
    width: 100%;
    padding: 10px;
    border-radius: var(--default-radius);
    background: var(--background);
    border-width: 2px;
    margin-bottom: 15px;

    &:enabled {
      border-color: var(--secondary);
    }
  }

  label {
    font-weight: 400;
    margin-bottom: 5px;
    font-size: 15px;
  }
}

@media screen and (max-width: 600px) {
  form {
    width: 100%;
  }
}
</style>
