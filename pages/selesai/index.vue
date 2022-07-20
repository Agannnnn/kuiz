<script lang="ts">
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { defineComponent } from "vue";
import { auth, db } from "../../firebase/config";

interface JawabanKuiz {
  idKuiz: string | number;
  jawaban: number[];
  user: string | number;
}

interface Kuiz {
  judul: string;
  soal: { soal: string; jawabanBenar: number; jawaban: string[] }[];
  dibuat: string;
  author: string;
}

interface Data {
  judul: string;
  nilai: number;
}

export default defineComponent({
  data(): { kuiz: Data[] } {
    return {
      kuiz: [],
    };
  },
  fetchOnServer: false,
  async fetch() {
    const data = await getDocs(
      query(
        collection(db, "jawabanKuiz"),
        where("user", "==", auth.currentUser?.uid)
      )
    );
    const kuiz: Data[] = [];
    data.forEach(async (data) => {
      const docKuiz = (
        await getDoc(doc(db, `kuiz/${(data.data() as JawabanKuiz).idKuiz}`))
      ).data() as Kuiz;

      const jawabanKuiz = { judul: docKuiz.judul, nilai: 0 };
      (data.data() as JawabanKuiz).jawaban.forEach((jawaban, i) => {
        if (jawaban === docKuiz.soal[i].jawabanBenar) {
          jawabanKuiz.nilai += 100 / docKuiz.soal.length;
        }
      });

      kuiz.push(jawabanKuiz);
    });
    this.kuiz = kuiz;
  },
});
</script>

<template>
  <div>
    <h1>Daftar Kuiz Selesai</h1>
    <button
      v-if="!$fetchState.pending"
      @click="$fetch"
      class="tombol-muat-ulang"
    >
      Muat ulang
    </button>
    <span v-if="$fetchState.pending">Sedang memuat data...</span>
    <span v-if="$fetchState.error">Gagal memuat data...</span>
    <div class="kuiz">
      <span>No.</span>
      <span>Judul</span>
      <span>Nilai</span>
    </div>
    <div class="kuiz" v-for="(k, i) in kuiz">
      <span>{{ ++i }}.</span>
      <span class="judul">{{ k.judul }}</span>
      <span class="nilai" :class="{ gagal: k.nilai < 50 }">{{ k.nilai }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.kuiz {
  border: 3px solid rgb(50, 50, 50);
  margin-bottom: 1em;
  padding: 12px 1em;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 15px;

  .gagal {
    color: #ffffff;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: red;
  }
}
.tombol-muat-ulang {
  border: 3px solid rgb(50, 50, 50);
  background-color: #ffffff;
  padding: 5px 1em;
  margin-bottom: 0.5em;
  cursor: pointer;
  display: block;

  &:is(:hover, :active, :focus) {
    color: #ffffff;
    background-color: rgb(50, 50, 50);
  }
}
</style>
