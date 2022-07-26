<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["judul", "nilai", "no"],
});
</script>

<template>
  <div class="kuiz">
    <span>{{ no }}</span>
    <span class="judul">{{ judul }}</span>
    <span class="nilai" :class="{ gagal: nilai < 50 }">{{ nilai }}</span>
  </div>
</template>
