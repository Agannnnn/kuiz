<script setup lang="ts">
import Header from "~/components/Header.vue";
</script>

<template>
  <div class="container">
    <Header />
    <main>
      <Nuxt />
    </main>
    <footer>
      <p>Dibuat oleh Sultan Ahmad</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr min-content;

  main {
    border: 4px solid rgb(50, 50, 50);
    margin: 3em auto;
    max-width: 600px;
    width: 100vw;
    padding: 15px;
  }
  footer {
    background-color: rgb(50, 50, 50);
    color: #ffffff;
    text-align: center;
  }
}
</style>
