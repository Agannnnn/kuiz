<script lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { defineComponent } from "vue";
import { db } from "../firebase/config";

interface PagesData {
  quiz: { judul: string; dibuat: Date }[];
}

export default defineComponent({
  data(): PagesData {
    return {
      quiz: [],
    };
  },
  async fetch(): Promise<void> {
    const docs = await getDocs(collection(db, "kuiz"));
    this.quiz = docs.docs.map((doc) => {
      const judul = doc.data().judul;
      const dibuat = doc.data().dibuat;
      return { judul, dibuat };
    });
  },
  fetchOnServer: false,
});
</script>

<template>
  <div>
    <button v-if="!$fetchState.pending" @click="$fetch" class="reload-quiz">
      Reload
    </button>
    <p v-if="$fetchState.pending">Sedang memuat quiz...</p>
    <p v-else-if="$fetchState.error" :style="{ color: 'red' }">
      Terjadi error saat memuat quiz
    </p>
    <div
      v-else-if="!$fetchState.pending && !$fetchState.error && quiz.length > 0"
    >
      <NuxtLink
        v-for="q in quiz"
        class="quiz"
        :to="`/quiz/${q.judul.toLowerCase().split(' ').join('-')}`"
      >
        <h3>
          {{ q.judul }}
        </h3>
        <small>Dibuat pada {{ q.dibuat }}</small>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reload-quiz {
  border: 3px solid rgb(50, 50, 50);
  background-color: #3164ff;
  color: #ffffff;
  margin-bottom: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.quiz {
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
