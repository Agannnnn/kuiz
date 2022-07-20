<script lang="ts">
import { signInWithEmailAndPassword } from "@firebase/auth";
import { defineComponent } from "vue";
import { auth } from "../../firebase/config";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      kredensialSalah: false,
    };
  },

  methods: {
    handleLogin() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert("Login berhasil");
          this.$router.push("/");
        })
        .catch(() => {
          alert("Login gagal; Email atau password salah");
          this.kredensialSalah = true;
        });
    },
  },
});
</script>

<template>
  <div>
    <h2 class="judul">LOGIN</h2>
    <form @submit.prevent="handleLogin">
      <p class="warning" v-if="kredensialSalah">
        Isi field email dan password dengan benar!
      </p>
      <div class="inputs">
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="email (contoh: test@example.com)"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="password (contoh: testpassword)"
        />
      </div>
      <div class="buttons">
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  .judul {
    text-align: center;
  }

  form {
    .inputs {
      display: flex;
      flex-direction: column;
      height: fit-content;
      gap: 5px;

      input {
        padding: 5px;
        border: 3px solid rgb(50, 50, 50);
      }
    }

    .warning {
      color: #ffffff;
      padding: 0.5em 1em;
      background-color: rgba(255, 0, 0, 0.5);
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 5px;
      justify-content: end;
      align-items: center;

      button {
        width: fit-content;
        border: 3px solid rgb(50, 50, 50);
        background-color: #ffffff;
        font-weight: 500;
        padding: 10px 15px;
        cursor: pointer;
      }
      button:is(:hover, :active, :focus) {
        background-color: rgb(50, 50, 50);
        color: #ffffff;
      }
    }
  }
}
</style>
