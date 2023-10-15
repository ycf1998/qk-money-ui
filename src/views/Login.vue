<template>
    <div class="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8" @keydown.enter="login">
        <el-card class="mx-auto max-w-lg">
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules"
                     class="mb-0 mt-2 rounded-lg p-4 sm:p-6 lg:p-8">
                <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mb-10">
                    {{title}}
                </h1>

                <div>
                    <label for="username" class="sr-only">username</label>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" size="large" placeholder="Enter username" />
                    </el-form-item>
                </div>

                <div>
                    <label for="password" class="sr-only">Password</label>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" size="large" type="password" show-password
                                  placeholder="Enter password" />
                    </el-form-item>
                </div>

                <el-button :loading="loading" @click="login" size="large"
                           class="w-full !bg-indigo-600 !text-white !rounded-lg mt-3">
                    Sign in
                </el-button>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
const title = document.title
import {ref} from "vue"
import {useUserStore} from '@/store'
import {useRoute, useRouter} from 'vue-router'

const $router = useRouter();
const redirect = useRoute().query.redirect
const userStore = useUserStore()
const loginFormRef = ref()
const loginForm = ref({
    username: 'money',
    password: '123'
})
const rules = {
    username: [{required: true, trigger: 'change'}],
    password: [{required: true, trigger: 'change'}]
}
const loading = ref(false)

async function login(e) {
    e.preventDefault()
    await loginFormRef.value.validate((valid) => {
        if (!valid) return
        loading.value = true
        userStore.login(loginForm.value)
            .then(() => $router.push({path: redirect || '/'}))
            .catch(() => loading.value = false)
    })
}
</script>