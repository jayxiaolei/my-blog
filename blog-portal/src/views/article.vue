<template>
    <div class="article">
        <div class="nav">
            <Nav />
        </div>

        <h1 class="article-title">文章题目</h1>
        <div class="article-main">
            <article class="article-content article-box">
                <v-md-preview
                    :text="text"
                    height="400px"
                    ref="preview"
                    :include-level="[3, 4]"
                ></v-md-preview>
            </article>
            <nav
                class="article-nav article-box"
                :class="{ 'nav-fix': scrollTop >= 130 }"
            >
                <div class="nav-title">
                    <ElIcon size="1.5rem" style="vertical-align: middle">
                        <Tickets />
                    </ElIcon>
                    <span style="vertical-align: middle">目录</span>
                    <div
                        v-for="(item, index) in titles.arr"
                        :key="index"
                        :style="{
                            padding: `10px 0 10px ${item.indent * 20}px`,
                        }"
                        :class="{ 'scroll-color': item.isArrive }"
                        @click="handleAnchorClick(item)"
                    >
                        <a class="nav-text">{{ item.title }}</a>
                    </div>
                </div>
            </nav>
        </div>

        <div class="article-comment">
            <div class="comment-content article-box">
                <Comment ref="comment" :content="commentList" @refresh-comments="refreshComments" />
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import { reactive, computed, watch, ref } from 'vue'
import Nav from '_c/nav.vue'
import Footer from '_c/footer.vue'
import { ElIcon } from 'element-plus'
import { Tickets } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import Comment from '_c/comment.vue'
import { getArticleDetail, getComments } from '_ax/article'
import { useRoute } from 'vue-router'
export default {
    components: {
        Nav,
        ElIcon,
        Tickets,
        Comment,
        Footer,
    },
    setup() {
        const text = ref('')
        const commentList = ref([])
        const titles = reactive({
            arr: [],
        })
        const route = useRoute()
        const store = useStore()
        let scrollTop = computed(() => store.state.scrollTop)
        const isArrive = (item, next) => {
            if (!next && item.top <= store.state.scrollTop) {
                item.isArrive = true
                return item.isArrive
            } else if (
                store.state.scrollTop >= item.top &&
                store.state.scrollTop < next.top
            ) {
                item.isArrive = true
                return true
            } else {
                item.isArrive = false
                return false
            }
        };

        const refreshComments = () => {
            getCommentLists();
        };

        getCommentLists();
        function getCommentLists() {
            getComments({ article_id: route.params.id })
            .then(({ data }) => {
                commentList.value = data
            });
        }

        watch(
            () => store.state.scrollTop,
            newV => {
                titles.arr.forEach((item, index) => {
                    if (index === titles.arr.length - 1 && newV >= item.top) {
                        item.isArrive = true
                    } else if (
                        newV >= item.top &&
                        newV < titles.arr[index + 1].top
                    ) {
                        item.isArrive = true
                    } else {
                        item.isArrive = false
                    }
                })
            },
        )
        return {
            text,
            titles,
            scrollTop,
            isArrive,
            commentList,
            refreshComments
        }
    },
    mounted() {
        getArticleDetail({ id: this.$route.params.id }).then(({ data }) => {
            this.text = data.article_content
            this.$nextTick(() => {
                const anchors =
                    this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
                const titles = Array.from(anchors).filter(
                    title => !!title.innerText.trim(),
                )
                if (!titles.length) {
                    this.titles = []
                    return
                }
                const hTags = Array.from(
                    new Set(titles.map(title => title.tagName)),
                ).sort()

                this.titles.arr = titles.map(el => ({
                    title: el.innerText,
                    lineIndex: el.getAttribute('data-v-md-line'),
                    indent: hTags.indexOf(el.tagName),
                    top: el.getBoundingClientRect().top - 80,
                }))
            })
        })
    },
    methods: {
        handleAnchorClick(anchor) {
            const { preview } = this.$refs
            const { lineIndex } = anchor

            const heading = preview.$el.querySelector(
                `[data-v-md-line="${lineIndex}"]`,
            )

            if (heading) {
                preview.scrollToTarget({
                    target: heading,
                    scrollContainer: window,
                    top: 60,
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.article-title {
    color: #aaa;
    text-align: center;
    margin: 50px 0;
}

.article-box {
    border-radius: 10px;
    box-shadow: 0 10px 35px 2px rgb(0 0 0 / 15%), 0 5px 15px rgb(0 0 0 / 7%),
        0 2px 5px -5px rgb(0 0 0 / 10%);
    transition-delay: 0.2s;
    transition-duration: 1s;
}

.nav-title {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.5rem;
}
@media screen and (min-width: 993px) {
    .article-main {
        width: 90%;
        margin: 0 auto;

        .article-content {
            display: inline-block;
            box-sizing: border-box;
            background-color: var(--main-color);
            width: 75%;
            min-height: 400px;
            padding: 25px;
        }

        .article-nav {
            box-sizing: border-box;
            background-color: var(--main-color);
            width: 22%;
            padding: 25px;
            float: right;
        }

        .nav-text {
            font-size: 1rem;
            cursor: pointer;
        }

        .nav-text:hover {
            color: #3eaf7c;
        }
    }

    .article-comment {
        width: 90%;
        margin: 0 auto;

        .comment-content {
            display: inline-block;
            box-sizing: border-box;
            margin-top: 50px;
            width: 75%;
            padding: 25px;
            background-color: var(--main-color);
        }
    }
}

@media screen and (max-width: 993px) {
    .article-main {
        width: 98%;
        margin: 0 auto;

        .article-content {
            box-sizing: border-box;
            background-color: white;
            width: 100%;
            min-height: 400px;
            padding: 25px;
            margin-bottom: 50px;
        }

        .article-nav {
            display: none;
        }
    }

    .article-comment {
        width: 98%;
        margin: 0 auto;

        .comment-content {
            box-sizing: border-box;
            margin-top: 50px;
            width: 100%;
            padding: 25px;
            background-color: var(--main-color);
        }
    }
}

.article {
    .article-main {
        .nav-fix {
            position: sticky;
            top: 100px;
            transform: translateY(100px);
            overflow: hidden;
        }

        .scroll-color {
            color: #3eaf7c;
        }
    }
}
</style>
