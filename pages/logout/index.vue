<script lang="ts">
import { signOut } from "firebase/auth";
import { defineComponent } from "vue";
import { auth } from "~/firebase/config";

export default defineComponent({
  methods: {
    handleLogout() {
      this.$nuxt.$loading.start();
      signOut(auth).then(() => {
        this.$router.push("/login");
        this.$nextTick(() => this.$nuxt.$loading.finish());
      });
    },
  },
});
</script>

<template>
  <div>
    <h2>Apakah anda yakin ingin keluar?</h2>
    <p>Anda akan kehilangan akses untuk membuat dan mengerjakan quiz.</p>
    <small>Anda dapat login lagi untuk mendapatkan akses anda kembali.</small>

    <div class="buttons">
      <button @click="handleLogout">Ya</button>
      <NuxtLink to="/">Tidak</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  h2,
  p {
    margin-bottom: 10px;
  }

  .buttons {
    height: fit-content;
    padding: 0;
    margin-top: 2em;
    display: flex;
    flex-direction: row;
    gap: 5px;

    & > * {
      text-decoration: none;
      color: rgb(50, 50, 50);
      border: 3px solid rgb(50, 50, 50);
      background-color: #ffffff;
      padding: 5px 15px;
      cursor: pointer;

      &:is(:hover, :active, :focus) {
        background-color: rgb(50, 50, 50);
        color: #ffffff;
      }
    }
  }
}
</style>
