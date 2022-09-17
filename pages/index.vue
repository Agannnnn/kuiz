<script lang="ts">
import { FirebaseError } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { defineComponent } from "vue";
import Card from "~/components/quiz/Card.vue";
import { db } from "../firebase/config";

interface Quiz {
  judul: string;
  dibuat: Date;
}

export default defineComponent({
  data() {
    return {
      quiz: [] as Quiz[],
    };
  },
  mounted() {},
  async fetch() {
    await getDocs(collection(db, "kuiz"))
      .then((docs) => {
        this.quiz = docs.docs.map((doc) => {
          const judul = doc.data().judul;
          const dibuat = doc.data().dibuat;
          return { judul, dibuat };
        });
      })
      .catch((e: FirebaseError) => {
        if (e.code === "permission-denied") {
          this.$nextTick(() => {
            this.$router.push("/login");
          });
        }
      });
  },
  fetchOnServer: false,
  components: { Card },
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
      <Card v-for="q in quiz" :judul="q.judul" :dibuat="q.dibuat" />
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
</style>
