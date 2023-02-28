<template>
    <div class="user">
        <div class="container">
            <div class="btn-box">
                <el-button type="primary" @click="registerUser">新建</el-button>
            </div>
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="操作" width="200px">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="createDialog" title="新建" width="80%">
            <el-form
                ref="registerForm"
                :model="registerInfo"
                :rules="rules"
                label-width="120px"
                :size="formSize"
            >
                <el-form-item prop="username" label="用户名">
                    <el-input
                        v-model="registerInfo.username"
                        placeholder="请输入"
                    />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        v-model="registerInfo.password"
                        placeholder="请输入"
                    />
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input
                        v-model="registerInfo.confirmPassword"
                        placeholder="请输入"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(registerForm)"
                        >确定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { getUserList, delUser } from '_ax/user.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { regUser } from '_ax/login.js'
export default {
    setup() {
        const validatePassword = (rule, value, callback) => {
            if (value === registerInfo.password) {
                callback()
            } else {
                callback('密码必须一致')
            }
        }
        const registerForm = ref()
        const registerInfo = reactive({
            username: '',
            password: '',
            confirmPassword: '',
        })
        const rules = reactive({
            username: [
                {
                    required: true,
                    message: '请输入6-12位用户名',
                    max: 12,
                    min: 6,
                    trigger: 'blur',
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    max: 12,
                    min: 6,
                    trigger: 'blur',
                },
            ],
            confirmPassword: [
                { required: true, message: '请输入', trigger: 'blur' },
                { validator: validatePassword, trigger: 'blur' },
            ],
        })
        const submitForm = formEl => {
            if (!formEl) return
            formEl.validate(valid => {
                if (valid) {
                    regUser(registerInfo).then(
                        () => {
                            ElMessage.success('添加成功')
                            getList()
                            createDialog.value = false
                        },
                        err => {
                            ElMessage.error(err)
                        },
                    )
                }
            })
        }
        let userList = reactive([])
        let createDialog = ref(false)

        const getList = () => {
            getUserList().then(
                ({ data }) => {
                    userList.splice(0)
                    userList.push(...data.users)
                    ElMessage.success('获取成功')
                },
                err => {
                    ElMessage.error(err)
                },
            )
        }
        getList()

        const registerUser = () => {
            createDialog.value = true
        }

        const deleteUser = (row) => {
            ElMessageBox.confirm(
                '确认删除吗？',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
            .then(() => {
                delUser({ user_id: row.id })
                .then(() => {
                    ElMessage.success('删除成功')
                    getList()
                }, (err) => {
                    ElMessage.error(err)
                })
            })
        }
        return {
            userList,
            createDialog,
            registerUser,
            registerForm,
            registerInfo,
            rules,
            submitForm,
            deleteUser
        }
    },
}
</script>

<style lang="scss" scoped>
.btn-box {
    margin-bottom: 12px;
    text-align: right;
}
</style>