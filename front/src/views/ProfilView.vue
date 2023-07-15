<script setup lang="ts">
  import { userStore } from "@/stores/user";
  import { reactive, onMounted, ref } from 'vue';
  import * as jose from 'jose'
  
  const reader = jose
  const user = userStore().user
  let Jwt : any = localStorage.getItem('jwt')

  const editdUser = reactive({
    id: user.id,
    firstname: ref(''),
    lastname: ref(''),
    username: ref(''),
    password: ref(''),
    mail: ref(''),
  })

  onMounted(async () => {
    if(Jwt){
      const updateStore = await userStore().getUser(Jwt)
      Jwt = userStore().jwt
      if(Jwt == userStore().jwt){
        localStorage.setItem('jwt', Jwt)
        Object.assign(Jwt, reader.decodeJwt(Jwt).data)
      }
    }
  })

  async function OnSubmit(){
    if(editdUser.id == user.id && editdUser.firstname != "" && editdUser.lastname != "" && editdUser.username != "" && editdUser.password != "" && editdUser.mail != ""){
        await userStore().editUser(Jwt, editdUser)
    }
  }
</script>

<template>
    <form @submit.prevent="OnSubmit()">
        <input type="text" placeholder="Username" v-model="editdUser.username">
        <input type="password" placeholder="Mot de passe" v-model="editdUser.password">
        <input type="text" placeholder="Mail" v-model="editdUser.mail">
        <input type="text" placeholder="Nom" v-model="editdUser.lastname">
        <input type="text" placeholder="Prenom" v-model="editdUser.firstname">
    </form>
</template>


<style scoped>

</style>