<template>
    <div class="container">
        <div class="row" style="background:#e7e6e7;">
            <div class="col-md">
                <img :src="user.url"  class="avatar" alt="Avatar" />
            </div>
            <div class="col-md">
                <p>{{ user.nama }}</p>
                <p>{{ user.email }}</p>
                <p>{{ user.tempat }} / {{ user.tgl }}</p>
            </div>
            <div class="col-md">
                <button class="btn btn-info" @click="detail"><i class="fa fa-info-circle"></i></button>&nbsp;
                <button class="btn btn-warning">
                    <router-link :to="{ name: 'editUser', params: { id: user.id } }">
                        <i class="fa fa-pencil"></i></router-link>
                </button>&nbsp;
                <button class="btn btn-danger" @click="$emit('delete-user')"><i class="fa fa-trash"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router'
    export default {
        name: 'user-component',
        props: {
            user: {
                type: Object,
                default: () => {}
            },
            
        },
        setup(props){
            const router = useRouter()
    
            function detail(){
                router.push({ name: 'userDetail', params: { id: props.user.id, nama: props.user.nama,
                    email: props.user.email, password: props.user.password, url: props.user.url, tempat: props.user.tempat, 
                    tgl: props.user.tgl, deskripsi: props.user.deskripsi } })
            }
    
            return {
                detail
            }
        }
    
    }
    </script>
    
    <style>
    .avatar {
        margin-top: 10px;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
    }
    p {
        margin-top: 10px;
    }
    
    button{
        margin-top: 35px;
    }
    
    </style>