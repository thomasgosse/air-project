<template>
  <div>{{ drones }}</div>
</template>

<script lang="ts">
import { Drone } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DroneList",
  props: {
    drones: Array as PropType<Drone[]>
  }
});
</script>

<style></style>
