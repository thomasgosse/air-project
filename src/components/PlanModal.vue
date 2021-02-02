<template>
  <div class="modal">
    <Page title="Add plan">
      <div class="modal__form">
        <input />
        <input />
        <button @click="closeModal">close</button>
      </div>
    </Page>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { State } from "@/store/index";
import Page from "./Page.vue";

export default defineComponent({
  name: "PlanModal",
  components: {
    Page
  },
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  },
  setup() {
    const store = useStore<State>();
    const drones = computed(() => store.state.drones);
    const orders = computed(() => store.state.orders);
    const customers = computed(() => store.state.customers);
    const stocks = computed(() => store.state.stocks);
    const plans = computed(() => store.state.plans);
    return { drones, orders, customers, stocks, plans };
  }
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: var(--background);

  &__form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
