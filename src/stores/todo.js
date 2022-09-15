import { ref, reactive, onMounted, computed} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', () => {
  const todo = reactive({
    id: '',
    task: '',
    isDone: ''
  })

  const todos = ref([])
  function getTodo(){
    try {
      const token = JSON.parse (localStorage.getItem('token') );
      axios.get("http://localhost:3000",
      {
          headers: {
              'Authorization': `Basic ${token}` 
          }
      })
      .then(response => {
          todos.value = response.data
      });
    } catch (err) {
      console.log(err);
    }
  }
  return { todo, todos, getTodo}
})
