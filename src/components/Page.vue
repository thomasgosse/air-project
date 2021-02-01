<template>
  <div class="page">
    <h1 class="page__title">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Page",
  props: {
    title: String
  }
});
</script>

<style scoped lang="scss">
.page {
  padding: 30px;

  &__title {
    font-size: 40px;
    font-weight: 700;
    color: #79be1e;
  }
}
</style>
