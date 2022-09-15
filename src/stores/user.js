import { ref, reactive} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        id: '',
        nama: '',
        email: '',
        password: '',
        url: '',
        tempat: '',
        tgl: '',
        deskripsi: ''
    })
    
    const users = ref([])

    function getUser(){
        const token = JSON.parse(localStorage.getItem('token'));
        try {
          axios.get("http://localhost:3000/registration",
          {
            headers: {
                'Authorization': `Basic ${token}` 
            }
          }).then(response => {
            users.value = response.data;
          })
        } catch (err) {
          console.log(err);
        }
    }
      
  return { user, users, getUser}
})
