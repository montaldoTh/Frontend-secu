<script setup lang="ts">
  import * as jose from 'jose'
  import { userStore } from "@/stores/user";
  import { postStore } from "@/stores/post"
  import { reactive, onMounted, ref } from 'vue';
  const posts = postStore().posts
  const user = userStore().user
  let Jwt : any = localStorage.getItem('jwt')
  const reader = jose

  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const currentTime = new Date();
  const timeFormater = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const post = reactive({
    author: String,
    content: ref(''),
    date: dateFormatter.format(currentDate),
    time: timeFormater.format(currentTime),
    authId: String
  })

  onMounted(async () => {
    if(Jwt){
      const updateStore = await userStore().getUser(Jwt)
      Jwt = userStore().jwt
      if(Jwt == userStore().jwt){
        localStorage.setItem('jwt', Jwt)
        Object.assign(Jwt, reader.decodeJwt(Jwt).data)
      }
      ShowPost(Jwt)
    }
  })

  async function OnSubmit(){
    if(post.content != ""){
      post.author = user.username
      post.authId = user.id
      await postStore().createPost(Jwt, post)
    }
    ShowPost(Jwt)
  }

  async function ShowPost(Jwt: String){
    await postStore().getPosts(Jwt)
  }
</script>

<template>
  <div class="home" v-if="Jwt">
    <form @submit.prevent="OnSubmit()">
      <textarea name="post" id="post" cols="30" rows="10" placeholder="Ecrivez un post" v-model="post.content" />
      <button type="submit">Envoyer</button>
    </form>

    <div class="post" v-if="posts.length >= 3" v-for="post in posts">
      <p>{{ post.content }}</p>
      <p>{{ post.author }}</p>
    </div>
  </div>
</template>

<style>
  button{
    max-width: 200px;
    margin: 10px;
  }
  .post{
    margin: 25px;
  }
</style>