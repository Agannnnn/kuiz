<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["error"],
  layout: "default",
});
</script>

<template>
  <div>
    <h2 v-if="error.statusCode === 404">HALAMAN TIDAK TERSEDIA</h2>
    <h2 v-else>TERJADI ERROR</h2>
    <NuxtLink to="/">Kembali ke halaman utama</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    font-weight: 200;
    color: rgb(50, 50, 50);
  }
}
</style>
