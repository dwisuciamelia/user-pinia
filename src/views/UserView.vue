<template>
    <h3><b>List User</b></h3><br/>
    <div v-for="(user) in users" :key="user.id">
        <user-component :user="user" @delete-user="deleteUser(user.id)"/> <br />
    </div>
</template>

<script>
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import { onMounted } from 'vue'
import UserComponent from '../components/UserComponent.vue'
import axios from 'axios'
import {useTodoStore} from '@/stores/todo'
const todoStore =useTodoStore()
const { todos } = storeToRefs(todoStore)
const userStore = useUserStore()
const { users } = storeToRefs(userStore)

export default {
    name: 'user-view',
    components: {
        UserComponent
    },
    setup(){
        console.log(todos)
        onMounted(() => {
            userStore.getUser()
        })

        function deleteUser(id) {
            try {
                axios.delete(`http://localhost:3000/registration/deleteuser/${id}`).then(() => {
                userStore.getUser()
            });
          } catch (err) {
              console.log(err);
          }
        }
        todoStore.getTodo()

        return{ deleteUser, users, userStore }
    }
}
</script>