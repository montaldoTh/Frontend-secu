<script setup lang="ts">
  import { ref } from "vue"
  import { userStore } from "@/stores/user"

  const usn = ref('')
  const psw = ref('')
  const store = userStore()
  let Jwt = ""
  // A enlever
  async function OnSubmit(){
    if(usn.value == "" || psw.value == "" ){
      alert('An error occured: Parameters missing or invalid')
    }
    const updateStore = await store.SignIn(usn.value, psw.value)
    Jwt = store.jwt 
    if(Jwt != "" || Jwt != null){ localStorage.setItem('jwt', Jwt) }
  }
</script>

<template>
  <div class="login">
    <form @submit.prevent="OnSubmit()">
      <input type="text" placeholder="Nom d'utilisateur" v-model="usn">
      <input type="password" placeholder="Mot de passe" v-model="psw">
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<style>
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  form{
    display: flex;
    flex-direction: column;
  }
  input{
    margin-bottom : 10px;
  }
</style>