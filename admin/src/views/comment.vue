<template>
    <div class="article">
        <div class="container">
            <el-table :data="commentList" style="width: 100%">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="name" label="评论人" />
                <el-table-column prop="content" label="内容" />
                <el-table-column prop="parent_id" label="评论对象" />
                <el-table-column label="发表时间">
                    <template #default="scope">
                        {{
                            moment(scope.row.time).format(
                                'YYYY-MM-DD HH:MM:SS',
                            )
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="danger"
                            @click="deleteComment(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { getCommentsList, deleteData } from '_ax/comment.js'
import { ref, onMounted } from 'vue'
import moment from 'moment'

const commentList = ref([])

onMounted(() => {
    getData()
});
const getData = () => {
    getCommentsList()
    .then(({ data }) => {
        commentList.value = data;
    });
}

const deleteComment = (row) => {
    deleteData({ id: row.id })
    .then(() => {
        getData();
    });
}



</script>

<style lang="scss" scoped>

</style>