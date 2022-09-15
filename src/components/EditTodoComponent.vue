<template>
    <div class="user-form">
        <div class="row justify-content-md-center">
            <div class="col-md">
                <div class="card">
                    <div class="card-header" style="background:#98FB98">
                        <b>Update Todo</b>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="updateTodo()">
                                <div class="form-group">
                                    <label for="task">Task</label>
                                    <input type="text" class="form-control" name="task" v-model="todoStore.todo.task"
                                        placeholder="Masukkan Task Disini..." @keyup.enter="updateTodo()">
                                </div>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useTodoStore} from '@/stores/todo'
import {onMounted} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import router from '../router'
const todoStore = useTodoStore()

export default{
    setup(){
        const route = useRoute()

        onMounted(() => {
            try {
                axios.get(`http://localhost:3000/todo/${route.params.id}`)
                .then((response) => {
                    todoStore.todo.task = response.data[0].task
                    todoStore.todo.isDone = response.data[0].isDone
                })
            } catch (err) {
                console.log(err)
            }
        })

        function updateTodo() {
            try {
                axios.put(`http://localhost:3000/edittodo/${route.params.id}`, {
                    task: todoStore.todo.task
                }).then(() => {
                    alert('Update Success')
                    todoStore.todo.task = ""
                    router.push('/todo')
                    todoStore.getTodo()
                })
            } catch (err) {
                console.log(err);
            }
        }

        return { updateTodo, todoStore }
    }
}
</script>