<template>
    <div class="user-form">
        <div class="row justify-content-md-center">
            <div class="col-md">
                <div class="card">
                    <div class="card-header" style="background:#98FB98">
                        <b>Login</b>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email" v-model="userStore.user.email"
                                    placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" name="password" v-model="userStore.user.password"
                                    placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useUserStore} from '@/stores/user'
import router from '../router'
import axios from 'axios'
import {useTodoStore} from '@/stores/todo'
import {storeToRefs} from 'pinia'
import { onMounted } from 'vue'
const todoStore =useTodoStore()
const { todos } = storeToRefs(todoStore)
const userStore = useUserStore()

export default{
    setup(){
        function login(){
            try {
                axios.post("http://localhost:3000/login", {
                    email: userStore.user.email,
                    password: userStore.user.password
                }).then(r=>
                {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.token;
                    localStorage.setItem( 'token', JSON.stringify(r.data.token) );
                    todoStore.getTodo()
                    alert('Login Success')
                    router.push("/user");
                })
                    
            } catch (err) {
                console.log(err);
            }
        }

        return {login, userStore}
    }
}
</script>