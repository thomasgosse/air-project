<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody v-if="plans.length === 0">
      <tr class="empty-table">
        <td colspan="4">
          <span class="empty-table__content">
            <p class="empty-table__content--title">
              There are no flight plans for now...
            </p>
            <button @click="openModal">Create one</button>
            <img
              class="empty-table__image"
              src="../assets/undraw-drone-delivery.svg"
              width="400"
              height="400"
              alt="Drone delivering item to a customer"
            />
          </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="4">
          <button @click="openModal">+ Add plan</button>
        </td>
      </tr>
      <tr
        v-for="plan in plans"
        :key="plan.customerId + plan.productId + plan.drone.autonomy"
      >
        <td>{{ plan.drone }}</td>
        <td>{{ plan.store }}</td>
        <td>{{ plan.productId }}</td>
        <td>{{ plan.customerId }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Plan } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PlanTable",
  props: {
    plans: {
      type: Array as PropType<Plan[]>,
      required: true
    },
    openModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      headers: ["Drones", "Stores", "Produts", "Customers"]
    };
  }
});
</script>

<style lang="scss" scoped>
.empty-table {
  text-align: center;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &--title {
      font-weight: 600;
      font-size: 22px;
    }
  }

  &__image {
    max-width: 100%;
    max-height: 400px;
  }
}
</style>
