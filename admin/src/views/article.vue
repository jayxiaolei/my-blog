<template>
    <div class="article">
        <div class="container">
            <div class="btn-box">
                <el-button type="primary" @click="createArticle"
                    >新建</el-button
                >
            </div>
            <el-table :data="articleList" style="width: 100%">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="article_title" label="题目" />
                <el-table-column label="发表时间">
                    <template #default="scope">
                        {{
                            moment(scope.row.publish_date).format(
                                'YYYY-MM-DD HH:MM:SS',
                            )
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="primary"
                            @click="editArticle(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="small"
                            type="danger"
                            @click="deleteArticle(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { getArticleList, deleteArticleByID } from '_ax/article.js'
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'

export default {
    setup() {
        const router = useRouter()
        const articleList = reactive([])
        const createArticle = () => {
            router.push('/article/create')
        }
        const editArticle = row => {
            router.push(`/article/${row.id}`)
        }
        const deleteArticle = row => {
            ElMessageBox.confirm('确认删除吗？', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteArticleByID({ id: row.id })
                    .then(() => {
                        ElMessage.success('删除成功')
                        getList()
                    })
                    .catch(err => {
                        ElMessage.error(err)
                    })
            })
        }
        const getList = () => {
            getArticleList()
                .then(({ data }) => {
                    articleList.splice(0)
                    articleList.push(...data)
                    ElMessage.success('获取成功')
                })
                .catch(err => {
                    ElMessage.error(err)
                })
        }
        getList()

        return {
            createArticle,
            editArticle,
            deleteArticle,
            articleList,
            moment,
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