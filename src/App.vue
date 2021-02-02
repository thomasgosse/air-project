<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    Header
  },
  setup() {
    const store = useStore();
    store.dispatch("fetchOrders");
    store.dispatch("fetchDrones");
    store.dispatch("fetchCustomers");
    store.dispatch("fetchStocks");
  }
});
</script>

<style lang="scss">
#app {
  font-family: Helvetica Neue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  max-width: 1200px;
  margin: auto;
}

body,
html {
  margin: 0;
  background: rgb(253, 253, 246);
}
</style>
