<script lang="ts">
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
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

export default {
  data(): { kuiz: Data[] } {
    return {
      kuiz: [],
    };
  },
  async fetch() {
    const data = await getDocs(
      query(
        collection(db, "jawabanKuiz"),
        where("user", "==", auth.currentUser?.uid)
      )
    );
    data.forEach(async (data) => {
      const kuiz = (
        await getDoc(doc(db, `kuiz/${(data.data() as JawabanKuiz).idKuiz}`))
      ).data() as Kuiz;

      const jawabanKuiz = { judul: kuiz.judul, nilai: 0 };
      (data.data() as JawabanKuiz).jawaban.forEach((jawaban, i) => {
        if (jawaban === kuiz.soal[i].jawabanBenar) {
          jawabanKuiz.nilai += 100 / kuiz.soal.length;
        }
      });

      this.kuiz.push(jawabanKuiz);
    });
  },
};
</script>

<template>
  <div>
    <h1>Daftar Kuiz Selesai</h1>
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
</style>
