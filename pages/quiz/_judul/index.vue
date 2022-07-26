<script lang="ts">
import { addDoc, doc, getDoc, collection } from "@firebase/firestore";
import { defineComponent } from "vue";
import { auth, db } from "~/firebase/config";
import Soal from "~/components/quiz/Soal.vue";

interface PertanyaanQuiz {
  pertanyaan: string;
  jawaban: string[];
  dipilih: number;
}

interface DocQuiz {
  judul: string;
  soal: {
    soal: string;
    jawaban: string[];
  }[];
}

export default defineComponent({
  data() {
    return { judul: "", pertanyaan: [] as PertanyaanQuiz[] };
  },
  methods: {
    handleFormSubmit() {
      addDoc(collection(db, "jawabanKuiz"), {
        idKuiz: this.$route.params.judul,
        jawaban: this.pertanyaan.map((pertanyaan) => pertanyaan.dipilih),
        user: auth.currentUser?.uid,
      })
        .then(() => alert("Jawaban sudah disimpan"))
        .catch(() => console.warn("Jawaban tidak dapat disimpan"));
    },
  },
  async fetch() {
    const docKuiz = (
      await getDoc(doc(db, "kuiz", this.$route.params.judul))
    ).data() as DocQuiz;
    this.judul = docKuiz.judul;
    this.pertanyaan = docKuiz.soal.map((soal) => ({
      pertanyaan: soal.soal,
      jawaban: soal.jawaban,
      dipilih: 0,
    }));
  },
  fetchOnServer: false,
  components: { Soal },
});
</script>

<template>
  <div>
    <h2>{{ judul }}</h2>
    <form @submit.prevent="handleFormSubmit">
      <Soal
        v-for="(p, noPertanyaan) in pertanyaan"
        :pertanyaan="p"
        :noPertanyaan="noPertanyaan"
        @click="
          (jawaban) => {
            p.dipilih = jawaban;
          }
        "
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
button[type="submit"] {
  border: 3px solid rgb(50, 50, 50);
  background-color: #ffffff;
  padding: 5px 10px;
  cursor: pointer;

  &:is(:hover, :active, :focus) {
    background-color: rgb(50, 50, 50);
    color: #ffffff;
  }
}
</style>
