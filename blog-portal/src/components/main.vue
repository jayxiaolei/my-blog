<template>
    <div class="container">
        <div class="article-title-box">
            <div class="main-title">阿金</div>
            <div class="title-detail">———DO THE RIGHT THING———</div>
        </div>

        <div class="article-content">
            <div
                v-for="(item, index) in reactList"
                :key="index"
                ref="cardWrap"
                class="card-wrap aos-animate"
                :class="{ 'show-item': item.isShow }"
                @click="readArticle(item)"
            >
                <div class="card">
                    <div class="content-img">
                        <img :src="item.article_img || defaultImg" alt="" />
                        <span class="img-detail">{{ item.article_title }}</span>
                    </div>
                    <div class="content-detail">
                        <p>{{ item.article_title }}</p>
                        <div>
                            <span>{{ moment(item.publish_date).format('YYYY-MM-DD') }}</span>
                            <span class="detail-label">{{ item.article_cate }}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="footer-content">{{ item.category }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { getArticleList } from '_ax/article.js';
import moment from 'moment';
export default {
    setup() {
        const reactList = reactive([]);
        const store = useStore();
        const defaultImg = ref('https://imgs.699pic.com/images/601/257/313.jpg!seo.v1');
        const scrollTop = computed(() => store.state.scrollTop);

        onMounted(() => {
            getArticleList().then(({ data }) => {
                data.map((item) => {
                    item.isShow = false;
                    return item;
                });

                reactList.splice(0);
                reactList.push(...data);
            });
        });
        return {
            reactList,
            scrollTop,
            moment,
            defaultImg,
        };
    },
    watch: {
        scrollTop() {
            this.showContent();
        },
    },
    methods: {
        showContent() {
            const clientHeight = document.documentElement.clientHeight;
            this.$refs.cardWrap.forEach((item, index) => {
                if (clientHeight - item.getBoundingClientRect().top > 30) {
                    this.reactList[index].isShow = true;
                } else {
                    this.reactList[index].isShow = false;
                }
            });
        },
        readArticle(item) {
            const path = '/article/' + item.id;
            this.$router.push(path);
        },
    },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
    .container {
        width: 85%;
        margin: 0 auto;
    }

    .card-wrap {
        display: inline-block;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0 0 10px 0;
    }
}

@media screen and (min-width: 601px) and (max-width: 992px) {
    .container {
        width: 90%;
        margin: 0 auto;
    }

    .card-wrap {
        display: inline-block;
        width: 50%;
        position: relative;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0;
        margin: 0 0 10px 0;
    }
}

@media screen and (min-width: 993px) {
    .container {
        width: 90%;
        max-width: 1125px;
        margin: 0 auto;
    }

    .card-wrap {
        display: inline-block;
        width: 33.33%;
        position: relative;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0;
        margin: 0 0 10px 0;
    }
}

.card {
    cursor: pointer;
}
.article-title-box {
    box-sizing: inherit;
    padding: 20px;
    background: white;
    text-align: center;
    border-radius: 10px;
    box-shadow:
        0 15px 35px rgb(50 50 93 / 10%),
        0 5px 15px rgb(0 0 0 / 7%) !important;
    margin: 20px 0;
}

.article-title-box .main-title {
    margin-bottom: 20px;
}

.article-content {
    width: 100%;
}

.article-content .card .content-img {
    position: relative;
    border-radius: 8px;
    box-sizing: inherit;
    height: 220px;
}

.article-content .card .content-img img {
    height: 220px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.img-detail {
    position: absolute;
    color: var(--main-color, black);
    padding: 2em;
    left: 0;
    bottom: 0;
}

.content-detail {
    padding: 15px 15px 12px 18px;
    background: white;
    width: 100%;
    box-sizing: border-box;
}

.content-detail p {
    margin-bottom: 6px;
}

.detail-label {
    float: right;
}

.card-footer {
    box-sizing: border-box;
    padding: 10px 15px 10px 18px;
    width: 100%;
    background: white;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    border-radius: 0 0 8px 8px;
}

.footer-content {
    display: inline-block;
    font-size: 0.8rem;
    margin: 2px;
    padding: 0 12px;
    height: 22px;
    line-height: 22px;
    border-radius: 10px;
    background-image: linear-gradient(to right, #040404 0%, #020202 100%);
    color: white;
}

.aos-animate {
    opacity: 0;
    transform: scale(0.6);
    transition-delay: 0.1s;
    transition-duration: 0.7s;
}

.show-item {
    opacity: 1;
    transform: translate(0) scale(1);
}
</style>
>
