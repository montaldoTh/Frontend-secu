import { defineStore } from "pinia";
import axios from "axios";

const postStore = defineStore('post',{
    state: ()=>({
        post: "",
        posts: [{
            content: String,
            author: String,
            date: String,
            time: String,
            authId: String
        }]
    }),
    actions: {
        async createPost(Jwt: string, post: Object = { author: String, date: String, content: String, authId: String }){
            try{
                const newPost= post
                const response = await axios.post('/createPost', newPost, { headers: { 'Authorization': `Bearer ${Jwt}` } })
                this.post = response.data
            } catch (err){
                console.log(err);
            }
        },

        async getPosts(Jwt: String){
            try {
                const response = await axios.get('/getPosts', { headers: { 'Authorization': `Bearer ${Jwt}` } })
                this.posts = response.data
            } catch (err){
                console.log(err);
            }
        }
    }
})

export { postStore }
