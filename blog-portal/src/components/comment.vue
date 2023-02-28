<template>
    <div class="comment" v-for="(item, index) in content" :key="index">
        <div>
            <ElAvatar fit="cover" :src="item.avatar" />
        </div>
        <div class="content-box">
            <div class="content-main">
                <div class="user-box">
                    <span class="user-name">{{ item.name }}</span>
                    <span class="user-position">{{ item.position }}</span>
                    <span class="comment-time">{{ item.time }}</span>
                </div>
                <div class="content">
                    {{ item.content }}
                </div>
                <div class="action-box">
                    <div
                        class="item"
                        @click="givePraise(item)"
                        :class="{ active: item.is_praise }"
                    >
                        <img src="../assets/praise.svg" style="width: 14px" />
                        {{ item.praise_num ? item.praise_num : '点赞' }}
                    </div>
                    <div
                        class="item"
                        @click="answerQuestion(item)"
                        :class="{ active: item.is_answer }"
                    >
                        <ElIcon :size="15">
                            <ChatDotSquare />
                        </ElIcon>
                        {{
                            item.is_answer
                                ? '取消回复'
                                : item.message_num
                                ? item.message_num
                                : '回复'
                        }}
                    </div>
                </div>
            </div>
            <div class="subcomment-wrapper">
                <div class="comment-form" v-if="item.is_answer">
                    <div class="comment-form-content">
                        <ElInput
                            v-model="textarea"
                            maxlength="100"
                            placeholder="Please input"
                            show-word-limit
                            type="textarea"
                        />
                    </div>
                    <div class="comment-form-action">
                        <ElButton type="primary">发布</ElButton>
                    </div>
                </div>
                <div class="sub-comment-list">
                    <div
                        class="sub-comment"
                        v-for="(child, i) in item.message_content"
                        :key="i"
                    >
                        <div>
                            <ElAvatar :src="child.avatar" />
                        </div>
                        <div class="content-box">
                            <div class="content-wrapper">
                                <div class="user-box">
                                    <span class="user-name">{{
                                        child.name
                                    }}</span>
                                    <span class="user-position">{{
                                        child.position
                                    }}</span>
                                    <div
                                        class="comment-answer"
                                        v-if="child.target_user"
                                    >
                                        <span>回复</span>
                                        <span>{{
                                            child.target_user?.name
                                        }}</span>
                                    </div>
                                    <span class="comment-time">{{
                                        child.time
                                    }}</span>
                                </div>
                                <div class="content">
                                    {{ child.content }}
                                </div>
                                <div
                                    class="parent-wrapper"
                                    v-if="child.target_user"
                                >
                                    <div>"</div>
                                    <div>{{ child.target_user?.content }}</div>
                                    <div>"</div>
                                </div>
                                <div class="action-box">
                                    <div
                                        class="item"
                                        @click="givePraise(child)"
                                        :class="{ active: child.is_praise }"
                                    >
                                        <img
                                            src="../assets/praise.svg"
                                            style="width: 14px"
                                        />
                                        {{
                                            child.praise_num
                                                ? child.praise_num
                                                : '点赞'
                                        }}
                                    </div>
                                    <div
                                        class="item"
                                        @click="answerQuestion(child)"
                                        :class="{ active: child.is_answer }"
                                    >
                                        <ElIcon :size="15">
                                            <ChatDotSquare />
                                        </ElIcon>
                                        {{
                                            child.is_answer
                                                ? '取消回复'
                                                : child.message_num
                                                ? child.message_num
                                                : '回复'
                                        }}
                                    </div>
                                </div>
                                <div class="comment-form" v-if="child.is_answer">
                                    <div class="comment-form-content">
                                        <ElInput
                                            v-model="textarea"
                                            maxlength="100"
                                            placeholder="Please input"
                                            show-word-limit
                                            type="textarea"
                                        />
                                    </div>
                                    <div class="comment-form-action">
                                        <ElButton type="primary">发布</ElButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElAvatar, ElIcon, ElInput, ElButton } from 'element-plus'
import { ChatDotSquare } from '@element-plus/icons-vue'
import { ref } from 'vue'
export default {
    components: {
        ElAvatar,
        ElIcon,
        ChatDotSquare,
        ElInput,
        ElButton,
    },
    props: {
        content: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        let textarea = ref('')
        const givePraise = item => {
            if (item.is_praise) {
                item.is_praise = false
                item.praise_num--
            } else {
                item.is_praise = true
                item.praise_num++
            }
        }
        const answerQuestion = item => {
            textarea.value = ''
            if (item.is_answer) {
                item.is_answer = false
            } else {
                closeComment(props.content)
                item.is_answer = true
            }
        }

        const closeComment = arr => {
            arr.forEach(item => {
                item.is_answer = false
                if (item.message_content) {
                    closeComment(item.message_content)
                }
            })
        }
        return {
            givePraise,
            answerQuestion,
            closeComment,
            textarea,
        }
    },
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