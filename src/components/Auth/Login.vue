<template>
    <div class="form">
        <header>Login</header>
        <div class="box-error" v-if="loginData.error !== false">
            <ul>
                <li class="error-message">
                    {{ loginData.error.message }}
                </li>
            </ul>
        </div>
        <form action="" @submit.prevent="login()">
            <input type="text" v-model="loginData.username" placeholder="Username">
            <input type="password" v-model="loginData.password" placeholder="Password">
            <input type="submit" value="Login"> 
        </form>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

export default {
    data() {
        return {
            loginData: {
                username: '',
                password: '',
                success: false,
                error: false
            }
        }
    },
    methods: {
        login() {
            window.axios.post(baseURL+'auth/login', this.loginData)
            .then(response => {
                console.log(response)
                let user = response.data.user
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(user))

                Event.$emit('login', user)
                this.$router.push('board')
            })
            .catch(error => {
                this.loginData.error = error.response.data
            })
        },
    }
}
</script>