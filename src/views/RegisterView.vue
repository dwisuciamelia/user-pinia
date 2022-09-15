<template>
    <div class="user-form">
        <div class="row justify-content-md-center">
            <div class="col-md">
                <div class="card">
                    <div class="card-header" style="background:#98FB98">
                        <b>Registration</b>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="nama">Nama</label>
                                    <input type="text" class="form-control" name="nama" v-model="userStore.user.nama"
                                        placeholder="Masukkan nama disini...">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" name="email" v-model="userStore.user.email"
                                        placeholder="Masukkan email disini...">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" name="password" v-model="userStore.user.password"
                                        placeholder="Masukkan password disini...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="url">URL Picture Profile</label>
                                <input type="text" class="form-control" name="url" v-model="userStore.user.url"
                                    placeholder="Masukkan url disini...">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="tempat">Tempat</label>
                                    <input type="text" class="form-control" name="tempat" v-model="userStore.user.tempat"
                                        placeholder="Masukkan tempat lahir...">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="tgl">Tgl Lahir</label>
                                    <input type="date" class="form-control" name="tgl" v-model="userStore.user.tgl">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="deskripsi">Deskripsi </label>
                                <textarea class="form-control" name="deskripsi" v-model="userStore.user.deskripsi"
                                    placeholder="Masukkan deskripsi singkat..."></textarea>
  
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
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
const userStore = useUserStore()

export default {
    setup(){
        function register(){
        try {
              axios.post("http://localhost:3000/registration/adduser", 
               { 
                  nama: userStore.user.nama, 
                  email: userStore.user.email,
                  password: userStore.user.password, 
                  url: userStore.user.url, 
                  tempat: userStore.user.tempat,
                  tgl: userStore.user.tgl, 
                  deskripsi: userStore.user.deskripsi
              }).then(() => {
                alert('Registration Success')
                userStore.user.id = ""
                userStore.user.nama = ""
                userStore.user.email =""
                userStore.user.password =""
                userStore.user.url =""
                userStore.user.tempat =""
                userStore.user.tgl =""
                userStore.user.deskripsi =""
                router.push("/register")
              })
          } catch (err) {
              console.log(err);
          }
      }

      return { register, userStore }
    }
    
}
</script>