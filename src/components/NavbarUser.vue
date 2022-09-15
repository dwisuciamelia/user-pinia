<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item" >
        <router-link class="nav-link" to="/addtodo">Create Todo</router-link>
      </div>
      <div class="navbar-item" >
        <router-link class="nav-link" to="/todo">Todo</router-link>
      </div>
      <div class="navbar-item" >
        <router-link class="nav-link" to="/user">User</router-link>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="nav-link" to="/register">Register</router-link>
          <router-link class="nav-link" to="/login" v-if="!isLoggedIn">Login</router-link>
          <a href="javascript:void(0)" class="nav-link" @click="logout" v-if="isLoggedIn">Logout</a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import {computed} from 'vue';
import router from '../router';

export default {
  name: 'NavbarComponent',
  setup(){
    const isLoggedIn = computed(() => window.localStorage.getItem("token"))

    function logout() {
      localStorage.removeItem("token");
      router.push('/')
    }

    return {
      isLoggedIn,
      logout
    }
  }
};
</script>

