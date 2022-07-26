<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["pertanyaan", "noPertanyaan"],
  methods: {
    handler(opsi: number) {
      this.$emit("click", opsi);
    },
  },
});
</script>

<template>
  <div class="soal">
    <p>
      {{ pertanyaan.pertanyaan }}
    </p>
    <div v-for="(pilihan, i) in pertanyaan.jawaban" class="pilihan">
      <input
        type="radio"
        :id="pilihan"
        :name="noPertanyaan"
        required
        @click="() => handler(i)"
      />
      <label :for="pilihan"> {{ pilihan }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
