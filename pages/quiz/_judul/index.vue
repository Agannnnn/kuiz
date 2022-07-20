<script lang="ts">
import { addDoc, doc, getDoc, collection } from "@firebase/firestore";
import { defineComponent } from "vue";
import { auth, db } from "../../../firebase/config";

interface Data {
  judul: string;
  pertanyaan: {
    pertanyaan: string;
    jawaban: string[];
    dipilih: number;
  }[];
}
interface Doc {
  judul: string;
  soal: {
    soal: string;
    jawaban: string[];
  }[];
}

export default defineComponent({
  data(): Data {
    return { judul: "", pertanyaan: [] };
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
    ).data() as Doc;

    this.judul = docKuiz.judul;
    this.pertanyaan = docKuiz.soal.map((soal) => ({
      pertanyaan: soal.soal,
      jawaban: soal.jawaban,
      dipilih: 0,
    }));
  },
  fetchOnServer: false,
});
</script>

<template>
  <div>
    <h2>{{ judul }}</h2>
    <form @submit.prevent="handleFormSubmit">
      <div v-for="(p, i) in pertanyaan" class="soal">
        <p>
          {{ p.pertanyaan }}
        </p>
        <div v-for="(jwbn, j) in p.jawaban" class="pilihan">
          <input
            type="radio"
            :name="`soal-${i}`"
            :id="`opsi-${j}-soal-${i}`"
            @click="p.dipilih = j"
            :checked="p.dipilih === j"
          />
          <label :for="`opsi-${j}-soal-${i}`"> {{ jwbn }}</label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss">
.soal {
  border: 3px solid rgb(50, 50, 50);
  margin-bottom: 1em;
  padding: 1em;

  input[type="radio"] {
    opacity: 0.6;

    &:is(:focus, :active, :hover) {
      opacity: 1;
    }
  }
  input[type="radio"],
  label {
    cursor: pointer;
  }

  p {
    margin: 0;
    margin-bottom: 10px;
  }
}

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
