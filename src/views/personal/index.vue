<template>
    <PageWrapper>
        <div class="flex justify-center">
            <el-card class="flex-none w-full md:w-11/12 lg:w-4/5">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础信息" name="base" class="flex flex-col">
                        <el-upload
                            :action="uploadUrl" :headers="uploadHeader" :on-success="handleAvatarSuccess"
                            :show-file-list="false" accept="image/*">
                            <el-avatar :src="infoForm.avatar" shape="square" class="!w-28 !h-28 mb-4 cursor-pointer" />
                        </el-upload>
                        <el-form ref="infoFormRef" :model="infoForm" :rules="infoFormRules"
                                 label-width="auto" label-position="top" class="w-full"
                                 scroll-into-view-options>
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model.trim="infoForm.nickname" />
                            </el-form-item>
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model.number="infoForm.phone" />
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model.trim="infoForm.email" />
                            </el-form-item>
                            <el-form-item label="简介" prop="remark">
                                <el-input v-model.trim="infoForm.remark" type="textarea" rows="6" show-word-limit
                                          maxlength="200" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="updateInfo">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="changePwd">
                        <el-form ref="changePwdFormRef" :model="changePwdForm" :rules="changePwdFormRule"
                                 label-width="auto" label-position="top"
                                 scroll-into-view-options>
                            <el-form-item label="旧密码" prop="oldPassword">
                                <el-input v-model="changePwdForm.oldPassword" type="password" show-password />
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPassword">
                                <el-input v-model="changePwdForm.newPassword" type="password" show-password />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input v-model="changePwdForm.confirmPassword" type="password" show-password />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="changePassword">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </PageWrapper>
</template>

<script setup="props, context">
import PageWrapper from "@/components/PageWrapper.vue";

import {ref} from "vue";
import {useUserStore} from '@/store';
import {config, getOssUrl} from "@/money.config.js";
import {ElMessage} from "element-plus";
import {getToken} from "@/composables/token.js";

const userStore = useUserStore()
const activeName = 'base'
const loading = ref(false)
const uploadUrl = import.meta.env.VITE_BASE_URL + '/users/uploadAvatar'
const uploadHeader = {
    [config.tokenHeader]: getToken()
}

const infoFormRef = ref()
const infoForm = ref({
    avatar: getOssUrl(userStore.info.avatar),
    nickname: userStore.info.nickname,
    phone: userStore.info.phone,
    email: userStore.info.email,
    remark: userStore.info.remark
})
const infoFormRules = {
    nickname: [{required: true}],
    phone: [{pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/}],
    email: [{type: 'email'}]
}

const changePwdFormRef = ref()
const changePwdForm = ref({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
})
const validateConfirmPassword = (rule, value, callback) => {
    if (value !== changePwdForm.value.newPassword) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}
const changePwdFormRule = ref({
    oldPassword: [
        {required: true}
    ],
    newPassword: [
        {required: true}
    ],
    confirmPassword: [
        {required: true},
        {validator: validateConfirmPassword}
    ]
})

function handleAvatarSuccess(response, file) {
    infoForm.value.avatar = URL.createObjectURL(file.raw)
    ElMessage.success("头像更换成功")
}

async function updateInfo() {
    await infoFormRef.value.validate((valid) => {
        if (valid) {
            userStore.updateInfo(infoForm.value)
                .then(() => {
                    ElMessage.success('操作成功')
                    loading.value = false
                })
                .catch(() => loading.value = false)
        }
    })
}

async function changePassword() {
    await changePwdFormRef.value.validate((valid) => {
        if (valid) {
            userStore.changePassword(changePwdForm.value).catch(() => loading.value = false)
        }
    })
}
</script>