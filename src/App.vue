<template>
  <div id="app">
    <div class="header">
        <div>
            <a href="#" v-if="!loggedIn">Papan</a>
            <a href="#" v-else>Home</a>
        </div>
        <div class="right" v-if="!loggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
        <div class="right" v-else>
          <a href="">Welcome, {{ user.first_name }} {{ user.last_name }}</a> |
          <a href="#" @click="logout">Logout</a>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>

const baseURL = 'http://localhost:8000/v1/'
let token = localStorage.getItem('token')

export default {
  data() {
    return {
      loggedIn: false,
      registeredIn: false,
      closeOnClick: true,
      user: ''
    }
  },
  created() {

    this.checkToken()

    Event.$on('login', () => {
      this.loggedIn = true
    })

    Event.$on('logout', () => {
      this.loggedIn = false
    })

    this.fetchUserData()
  },
  methods: {
    fetchUserData() {
      window.axios.get(baseURL+'auth/user?token='+token)
      .then(response => {
        this.user = response.data.user
      })
    },
    checkToken() {
      if (!token) {
        return this.$router.push('login')
      }
    },
    logout() {
      window.axios.get(baseURL+'auth/logout?token='+token)
      .then(response => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        console.log(response)
      })
      .catch(error => {
        if(error.response.status == 401) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
