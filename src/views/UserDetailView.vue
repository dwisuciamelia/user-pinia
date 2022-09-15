<template>
    <div class="container">
        <img :src="$route.params.url" width="150" height="150" class="avatar" />
        <br/><br/>
        <h3>{{$route.params.nama}}</h3>
        <p>{{$route.params.tempat}} {{$route.params.tgl}}</p>
        <p>{{$route.params.email}}</p>
        <p>{{$route.params.deskripsi}}</p>
        <br/>
        <button @click="back" class="btn btn-secondary"><i class="fa fa-arrow-left"></i></button>
    </div>
    </template>
    
    <script> 
    import { useRouter } from 'vue-router';
    export default {
        setup(){
            const router = useRouter()
            function back(){
                router.push({ name: 'user' })
            }
    
            return {
                back
            }
        }
        
    }
    </script>
    
    <style>
    .avatar {
        border-radius: 50%;
    }
    .container {
        margin-top: 15px;
    }
    p{
        margin-top: 10px;
    }
    </style>