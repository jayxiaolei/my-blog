<template>
    <div class="article-detail">
        <el-input v-model="articleTitle" />
        <v-md-editor v-model="text" height="calc(100% - 32px)" @save="saveArticle"></v-md-editor>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { writeArticle, getArticleDetail, editArticleByID } from '_ax/article.js';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const text = ref('');
        const articleTitle = ref('');
        const router = useRouter();
        const route = useRoute();
        const saveArticle = () => {
            if (text.value && articleTitle.value) {
                const params = {
                    article_title: articleTitle.value,
                    article_content: text.value,
                };
                if (route.params.id) {
                    params.id = route.params.id;
                    editArticleByID(params)
                        .then(() => {
                            ElMessage.success('修改成功');
                        })
                        .catch((err) => {
                            ElMessage.error(err);
                        });
                } else {
                    writeArticle(params)
                        .then(() => {
                            ElMessage.success('添加成功');
                            router.push('/article');
                        })
                        .catch((err) => {
                            ElMessage.error(err);
                        });
                }
            } else {
                ElMessage.warning('请把内容填写完整');
            }
        };

        onMounted(() => {
            if (route.params.id) {
                getArticleDetail({
                    id: route.params.id,
                })
                    .then(({ data }) => {
                        articleTitle.value = data.article_title;
                        text.value = data.article_content;
                    })
                    .catch((err) => {
                        ElMessage.error(err);
                    });
            }
        });
        return {
            text,
            articleTitle,
            saveArticle,
        };
    },
};
</script>

<style lang="scss" scoped>
.article-detail {
    height: 100%;
}
</style>
