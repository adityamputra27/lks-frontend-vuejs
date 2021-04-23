<template>
    <div class="form">
        <header>Register</header>
        <div class="box-error" v-if="registerData.error.status == false">
            <ul>
                <li class="error-message" v-for="(error, index) in registerData.error.errors" :key="index">
                    {{ error[0] }}
                </li>
            </ul>
        </div>
        <form action="" @submit.prevent="register()">
            <input type="text" placeholder="First Name" v-model="registerData.first_name">
            <input type="text" placeholder="Last Name" v-model="registerData.last_name">
            <input type="text" placeholder="Username" v-model="registerData.username">
            <input type="password" placeholder="Password" v-model="registerData.password">
            <input type="password" placeholder="Confirm Password" v-model="registerData.password_confirmation">
            <input type="submit" value="Register">
        </form>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

export default {
    data() {
        return {
            registerData: {
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                password_confirmation: '',
                error: ''
            },
        }
    },
    methods: {
        register() {
            window.axios.post(baseURL+'auth/register', this.registerData)
            .then(response => {
                console.log(response)
                let token = response.data.token
                let user = response.data.user

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                Event.$emit('login', user)
                this.$router.push('board')

            }).catch(error => {
                this.registerData.error = error.response.data
            })
        }
    }
}
</script>

