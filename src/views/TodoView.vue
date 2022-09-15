<template>
    <div class="container">
        <h3><b>Todo List</b></h3><br/>
        <table class="table table-striped">
            <tbody v-for="(todo, index) in todos" :key="index" >
                <tr >
                    <td style="text-align:left" :class="{'done': todo.isDone}" @click="toggleDone(index)">{{ todo.task }}</td>
                    <td>
                        <router-link :to="{ name: 'editTodo', params: { id: todo.id } }"><i class="fa fa-pencil"></i></router-link>&nbsp;&nbsp;&nbsp;
                        <a @click="deleteTodo(todo.id)"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <small style="align:left; background:yellow">{{ totalDone }} dari {{ totalTODO }}</small>
    </div>
</template>

<script>
import {useTodoStore} from '@/stores/todo'
import {storeToRefs} from 'pinia'
const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
import { onMounted } from 'vue'
import axios from 'axios'
import { computed } from '@vue/reactivity'
import router from '../router'

export default{
    setup(){
        const totalTODO = computed(() => {
            return todoStore.todos.length
        })
        const totalDone = computed(() => {
            var done = 0;
            for(let i = 0; i < todoStore.todos.length; i++){
                if(todoStore.todos[i].isDone == true){
                    done++
                }
            }
            return done;
        })
        onMounted(() => {
            todoStore.getTodo()
        })
        function deleteTodo(id) {
            try {
            axios.delete(`http://localhost:3000/deletetodo/${id}`).then(() => {  
                todoStore.getTodo()
            });
          } catch (err) {
              console.log(err);
          }
        }
        function toggleDone(index){
            todoStore.todos[index].isDone = !todoStore.todos[index].isDone
            try{
                axios.put(`http://localhost:3000/edittodo/${todoStore.todos[index]}`, {
                    task: todoStore.todos[index].task,
                    isDone: todoStore.todos[index].isDone
                }).then(() => {
                    router.push('/todo')
                })
            } catch(err) {
                console.log(err)
            }
        }

        // function toggleDone(index){
        //     if(!todoStore.todos[index].isDone){
        //         axios.put(`http://localhost:3000/edittodo/${todoStore.todos[index]}`, {
        //             isDone: true
        //         }).then(() => {
        //             router.push('/todo')
        //         })
        //     } else {
        //         axios.put(`http://localhost:3000/edittodo/${todoStore.todos[index]}`, {
        //             isDone: false
        //         }).then(() => {
        //             router.push('/todo')
        //         })
        //     }
            
        // }

        return {deleteTodo, todoStore, todos, totalDone, totalTODO, toggleDone}
    }
}
</script>

<style>
.done {
    text-decoration: line-through;
}
small{
    position: absolute;
    left: 15px;
}
</style>