<template>
    <div class="user-form">
        <div class="row justify-content-md-center">
            <div class="col-md">
                <div class="card">
                    <div class="card-header" style="background:#98FB98">
                        <b>Update User</b>
                    </div>
                    <div class="card-body">
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
                            <button type="submit" @click="updateUser()" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useUserStore} from '@/stores/user'
import {onMounted} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import router from '../router'
const userStore = useUserStore()

export default{
    setup(){
        const route = useRoute()
        
        onMounted(() => {
        try {
          axios.get(`http://localhost:3000/registration/user/${route.params.id}`)
          .then(response => {
            userStore.user.nama = response.data[0].nama
            userStore.user.email = response.data[0].email
            userStore.user.password = response.data[0].password
            userStore.user.url = response.data[0].url
            userStore.user.tempat = response.data[0].tempat
            userStore.user.tgl = response.data[0].tgl
            userStore.user.deskripsi = response.data[0].deskripsi
          })
        } catch (err) {
          console.log(err);
        }
      })

      function updateUser(){
        try {
          axios.put(`http://localhost:3000/registration/edituser/${route.params.id}`, {
                id: userStore.user.id,  
                nama: userStore.user.nama, 
                email: userStore.user.email,
                password: userStore.user.password, 
                url: userStore.user.url, 
                tempat: userStore.user.tempat,
                tgl: userStore.user.tgl, 
                deskripsi: userStore.user.deskripsi
              }).then(() => {
                alert('Update Success')
                router.push('/user')
                userStore.getUser()
              })
          } catch (err) {
              console.log(err);
          }
      }

    return {updateUser, userStore}
    }
}
</script>