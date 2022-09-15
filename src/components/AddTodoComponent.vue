<template>
    <div class="user-form">
        <div class="row justify-content-md-center">
            <div class="col-md">
                <div class="card">
                    <div class="card-header" style="background:#98FB98">
                        <b>Add Todo</b>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addTodo">
                            <div class="form-group">
                                <label for="task">Task</label>
                                <input type="text" class="form-control" name="task" v-model="store.todo.task"
                                    placeholder="Masukkan Task Disini..." @keyup.enter="addTodo">
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useTodoStore} from '@/stores/todo'
import router from '../router'
import axios from 'axios'
const store = useTodoStore()


export default{
        setup(){
            function addTodo(){
                try {
                    axios.post("http://localhost:3000/addtodo", { 
                        task: store.todo.task,
                        isDone: false
                    }).then(() => {
                        alert('Add Todo Success')
                        store.todo.task = ""
                        router.push('/addtodo')
                    })
                    
                } catch (err) {
                    console.log(err);
                }
            }
            
            return { addTodo, store}
        }
    }

    
    
    
    
    
</script>
