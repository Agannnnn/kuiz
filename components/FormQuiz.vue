<script setup lang="tsx">
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { ref } from "vue";
import { auth, db } from "../firebase/config";

interface Soal {
  soal: string;
  jawaban: string[];
  jawabanBenar: number;
}

const soal = ref<Soal[]>([
  {
    soal: "",
    jawaban: [""],
    jawabanBenar: 0,
  },
]);
const judulSoal = ref("");

const handleFormSubmit = () => {
  const date = new Date();
  const data = {
    judul: judulSoal.value,
    soal: soal.value,
    dibuat: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    author: auth.currentUser?.uid,
  };
  setDoc(
    doc(db, "kuiz", judulSoal.value.toLowerCase().split(" ").join("-")),
    data
  )
    .then(() => {
      alert("Berhasilkan menambahkan data");
    })
    .catch(() => {
      alert("Gagal menambahkan data");
    });
};
const handleTambahSoal = () => {
  soal.value.push({
    soal: "",
    jawaban: new Array(""),
    jawabanBenar: 0,
  });
};
const handleHapusSoal = (indexSoal: number) => {
  soal.value.splice(indexSoal, 1);
};
const handleInputJudul = (e: Event) => {
  // Ngubah input supaya jadi uppercase tiap karakter (sesuai format judul biasa)
  judulSoal.value = (e.target as HTMLInputElement).value
    .split(" ")
    .map((kata) => {
      if (typeof kata[0] !== "undefined") {
        const karakter = kata.split("");
        karakter[0] = karakter[0].toUpperCase();
        kata = karakter.join("");
      }
      return kata;
    })
    .join(" ");
};
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <!-- INPUT JUDUL -->
    <input
      required
      autofocus
      type="text"
      name="judul"
      id="form-judul"
      :value="judulSoal"
      @input="handleInputJudul"
      class="input input-judul"
      placeholder="Judul Quiz"
    />
    <!-- INPUT JUDUL -->

    <div v-for="(s, indexSoal) in soal">
      <div class="input-soal">
        <!-- TEXTAREA SOAL -->
        <textarea
          required
          :name="`soal-${indexSoal}`"
          id="form-soal"
          cols="3"
          v-model.trim="s.soal"
          class="input"
          placeholder="Tuliskan Soal Di Sini"
        ></textarea>
        <!-- TEXTAREA SOAL -->

        <!-- PILIHAN GANDA -->
        <div class="input-jawaban" v-for="(j, indexJawaban) in s.jawaban">
          <!-- INPUT JAWABAN -->
          <textarea
            required
            rows="2"
            class="input"
            v-model.trim="s.jawaban[indexJawaban]"
            placeholder="Tuliskan Pilihan Di Sini"
            :name="`pilihan-ganda-${indexJawaban}-soal-${indexSoal}`"
          ></textarea>
          <!-- INPUT JAWABAN -->

          <!-- INPUT JAWABAN BENAR -->
          <input
            required
            type="radio"
            v-model="s.jawabanBenar"
            :value="indexJawaban"
            :name="`jawaban-benar-soal-${indexSoal}`"
            title="Pilih bila opsi ini merupakan kunci jawaban dari pertanyaan"
          />
          <small
            :style="{ color: 'rgba(0,0,0,0.8)', cursor: 'pointer' }"
            title="Pilih bila opsi ini merupakan kunci jawaban dari pertanyaan"
          >
            [?]
          </small>
          <!-- INPUT JAWABAN BENAR -->
        </div>
        <!-- PILIHAN GANDA -->

        <!-- TOMBOL TAMBAH JAWABAN -->
        <button
          class="input button"
          type="button"
          @click="() => s.jawaban.push('')"
        >
          Tambah Opsi Jawaban
        </button>
        <!-- TOMBOL TAMBAH JAWABAN -->
      </div>

      <div class="buttons">
        <!-- TOMBOL HAPUS SOAL -->
        <button
          class="input button"
          v-if="soal.length > 1"
          type="button"
          @click="handleHapusSoal(indexSoal)"
        >
          Hapus Soal
        </button>
        <!-- TOMBOL HAPUS SOAL -->

        <!-- TOMBOL TAMBAH SOAL -->
        <button class="input button" type="button" @click="handleTambahSoal">
          Tambah Soal
        </button>
        <!-- TOMBOL TAMBAH SOAL -->
      </div>
    </div>
    <button class="input button" type="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  flex-direction: column;
  display: flex;
}
.input-soal {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  padding: 20px;
  border: 3px solid rgb(50, 50, 50);
}
.input {
  padding: 5px;
  border: 2px solid rgb(50, 50, 50);
}
.input:is(:hover, :focus) {
  outline: none;
}
.input-jawaban {
  display: flex;
  margin: 10px 0;
  flex-direction: row;
}
.input-jawaban > textarea {
  width: 100%;
}
.input-judul {
  text-align: center;
  border: none;
  border-bottom: 2px solid rgb(50, 50, 50);
  margin: 10px 0 25px;
  display: flex;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
}
.buttons {
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  margin: 10px auto;
}
.button {
  padding: 8px 10px;
  background-color: #ffffff;
  transition: background 100ms;
  cursor: pointer;
}
.button:is(:hover, :focus) {
  background-color: rgb(50, 50, 50);
  color: #ffffff;
}
</style>
