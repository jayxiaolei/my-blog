<template>
    <div>
        <div v-for="item in content" :key="item.id" class="comment">
            <div>
                <ElAvatar fit="cover" :src="item.avatar" />
            </div>
            <div class="content-box">
                <div class="content-main">
                    <div class="user-box">
                        <span class="user-name">{{ item.name }}</span>
                        <span class="user-position">{{ item.location }}</span>
                        <span class="comment-time">{{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </div>
                    <div class="content">
                        {{ item.content }}
                    </div>
                    <div class="action-box">
                        <div class="item" :class="{ active: item.is_praise }" @click="givePraise(item)">
                            <img v-show="!item.is_praise" src="../assets/praise.svg" style="width: 14px" />
                            <img v-show="item.is_praise" src="../assets/praise-blue.svg" style="width: 14px" />
                            {{ item.praise_num ? item.praise_num : '点赞' }}
                        </div>
                        <div class="item" :class="{ active: item.is_answer }" @click="answerQuestion(item)">
                            <ElIcon :size="15">
                                <ChatDotSquare />
                            </ElIcon>
                            {{ item.is_answer ? '取消回复' : item.message_num ? item.message_num : '回复' }}
                        </div>
                    </div>
                </div>
                <div class="subcomment-wrapper">
                    <div v-if="item.is_answer" class="comment-form">
                        <div class="comment-form-content">
                            <ElInput v-model="textarea" maxlength="100" placeholder="Please input" show-word-limit type="textarea" />
                        </div>
                        <div class="comment-form-action">
                            <ElButton type="primary" @click="publish(item)">发布</ElButton>
                        </div>
                    </div>
                    <div v-if="item.children?.length" class="sub-comment-list">
                        <div v-for="child in item.children" :key="child.id" class="sub-comment">
                            <div>
                                <ElAvatar :src="child.avatar" />
                            </div>
                            <div class="content-box">
                                <div class="content-wrapper">
                                    <div class="user-box">
                                        <span class="user-name">{{ child.name }}</span>
                                        <span class="user-position">{{ child.location }}</span>
                                        <div v-if="child.target_user" class="comment-answer">
                                            <span>回复</span>
                                            <span>{{ child.target_user?.name }}</span>
                                        </div>
                                        <span class="comment-time">{{ dayjs(child.time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                    </div>
                                    <div class="content">
                                        {{ child.content }}
                                    </div>
                                    <div v-if="child.target_user" class="parent-wrapper">
                                        <div>"</div>
                                        <div>{{ child.target_user?.content }}</div>
                                        <div>"</div>
                                    </div>
                                    <div class="action-box">
                                        <div class="item" :class="{ active: child.is_praise }" @click="givePraise(child)">
                                            <img v-show="!child.is_praise" src="../assets/praise.svg" style="width: 14px" />
                                            <img v-show="child.is_praise" src="../assets/praise-blue.svg" style="width: 14px" />
                                            {{ child.praise_num ? child.praise_num : '点赞' }}
                                        </div>
                                        <div class="item" :class="{ active: child.is_answer }" @click="answerQuestion(child)">
                                            <ElIcon :size="15">
                                                <ChatDotSquare />
                                            </ElIcon>
                                            {{ child.is_answer ? '取消回复' : child.message_num ? child.message_num : '回复' }}
                                        </div>
                                    </div>
                                    <div v-if="child.is_answer" class="comment-form">
                                        <div class="comment-form-content">
                                            <ElInput v-model="textarea" maxlength="100" placeholder="Please input" show-word-limit type="textarea" />
                                        </div>
                                        <div class="comment-form-action">
                                            <ElButton type="primary" @click="publish(item, child)">发布</ElButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment-form">
            <div class="comment-form-content">
                <ElInput v-model="mainComment" maxlength="100" placeholder="Please input" show-word-limit type="textarea" />
            </div>
            <div class="comment-form-action">
                <ElButton type="primary" :disabled="!mainComment" @click="publish()">发布</ElButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChatDotSquare } from '@element-plus/icons-vue';
import { writeComment, praiseComment } from '_ax/article.js';
import dayjs from 'dayjs';
import { ElAvatar, ElIcon, ElInput, ElButton, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    content: {
        type: Array,
        default: () => [],
    },
});
const emits = defineEmits(['refreshComments']);
const textarea = ref('');
const mainComment = ref('');
const route = useRoute();
let location = '未知';
const name = localStorage.getItem('jay_name') || generateRandomName();

if (!localStorage.getItem('jay_name')) {
    localStorage.setItem('jay_name', name);
}
const givePraise = (item) => {
    if (item.is_praise) {
        return false;
    }

    praiseComment({ id: item.id }).then(() => {
        item.is_praise = true;
        item.praise_num++;
    });
};
const answerQuestion = (item) => {
    textarea.value = '';
    if (item.is_answer) {
        item.is_answer = false;
    } else {
        closeComment(props.content);
        item.is_answer = true;
    }
};

getLocation();
const closeComment = (arr) => {
    arr.forEach((item) => {
        item.is_answer = false;
        if (item.children) {
            closeComment(item.children);
        }
    });
};

const publish = (item, child) => {
    const params = {
        article_id: route.params.id,
        location: location,
        name: name,
        content: item ? textarea.value : mainComment.value,
        parent_id: item?.id,
        target_user: child
            ? {
                  name: child.name,
                  content: child.content,
              }
            : null,
    };

    writeComment(params).then(() => {
        ElMessage.success('添加成功');
        if (item) {
            answerQuestion(item);
        } else {
            mainComment.value = '';
        }
        emits('refreshComments');
    });
};

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude; // 获取纬度
            const longitude = position.coords.longitude; // 获取经度
            location = latitude + ',' + longitude;
        },
        () => {
            location = '未知';
        },
    );
}

function generateRandomName() {
    const firstNames = ['大头', '小明', '二货', '傻蛋', '呆呆', '皮皮', '搞笑', '无敌', '超级', '逗比'];
    const lastNames = ['熊猫', '小龙', '大象', '小丑', '火锅', '西瓜', '香蕉', '土豆', '泡面', '面条'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName}${randomLastName}`;
}
</script>

<style scoped>
.comment {
    display: flex;
    padding: 16px 0;
}

.content-box {
    margin-left: 16px;
    flex: 1 1 auto;
}

.user-box {
    display: flex;
}

.user-box .user-position {
    font-size: 14px;
    color: var(--side-color);
    line-height: 22px;
    margin-left: 13px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}

.user-box .comment-time {
    margin-left: auto;
    font-size: 14px;
    color: var(--side-color);
}

.content {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    font-weight: 400;
    line-height: 2rem;
    margin-top: 8px;
    color: #515767;
    -webkit-line-clamp: 6;
    font-size: 14px;
}

.action-box {
    display: flex;
    align-items: center;
    margin-top: 8px;
    user-select: none;
}

.action-box .item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    line-height: 22px;
    font-size: 14px;
    cursor: pointer;
    color: var(--side-color);
}

.sub-comment-list {
    margin-top: 16px;
    padding: 16px;
    background-color: rgba(247, 248, 250, 0.7);
    border-radius: 4px;
}

.sub-comment {
    display: flex;
}

.sub-comment + .sub-comment {
    margin-top: 2rem;
}

.action-box .active {
    color: #1e80ff;
}

.comment-answer span:first-of-type {
    font-size: 14px;
    color: var(--side-color);
    padding: 0 12px;
    line-height: 22px;
}

.parent-wrapper {
    display: flex;
    background-color: #f2f3f5;
    border: 1px solid #e4e6eb;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 12px;
    line-height: 36px;
    font-size: 14px;
    color: #8a919f;
    margin-top: 8px;
}

.comment-form {
    margin: 1rem 0;
}

.comment-form .comment-form-action {
    text-align: right;
    margin-top: 8px;
}
</style>
