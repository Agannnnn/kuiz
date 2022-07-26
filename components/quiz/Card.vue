<script lang="ts">
import { defineComponent } from "vue";
import { toSlug } from "~/lib/stringModifier";

export default defineComponent({
  props: ["judul", "dibuat"],
  data() {
    return { slug: toSlug(this.judul || "") };
  },
});
</script>

<template>
  <NuxtLink class="quiz" :to="`/quiz/${slug}`">
    <h3>
      {{ judul }}
    </h3>
    <small>Dibuat pada {{ dibuat }}</small>
  </NuxtLink>
</template>

<style scoped lang="scss">
.quiz {
  margin-bottom: 5px;
  border: 3px solid rgb(50, 50, 50);
  padding: 1.5em 2em;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: rgb(50, 50, 50);

  h3 {
    word-wrap: normal;
    margin: 0;
  }

  &:is(:hover, :active, :focus) {
    color: #ffffff;
    background-color: rgb(50, 50, 50);
  }
}
</style>
