import { defineStore } from 'pinia';
import axios from 'axios';

const userStore = defineStore('user', {
    state: ()=>({
        jwt: "",
        user: {
            id: String,
            username: String,
            password: String,
            firstname: String,
            lastname: String,
            mail: String
        }
    }),
    actions: {
        async SignIn(username : String, password : String) {
            try {
                const user : any = {
                    username,
                    password
                } 
                const response = await axios.post('/signin', user);
                this.jwt= response.data

            } catch (error) {
                console.log(error); 
            }
        },
        async getUser(Jwt : String){
            try{
                const response = await axios.get('/getUser', { headers: { 'Authorization': `Bearer ${Jwt}` } })
                this.user = response.data
                
            } catch (err){
                console.log(err);
            }
        },
        async editUser(Jwt: String, User: Object){
            try{
                const response = await axios.post('/edtUser', {Jwt, User} ,{ headers: { 'Authorization': `Bearer ${Jwt}` } })
                this.user = response.data
            } catch (err){
                console.log(err);
            }
        }
    }
})

export { userStore }