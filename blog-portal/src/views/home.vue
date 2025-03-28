<template>
    <div class="home">
        <div class="header">
            <div class="blog-img">
                <Nav />
                <ElButton
                    round
                    size="large"
                    class="read-content"
                    @click="readContent"
                    >点击阅读</ElButton
                >
            </div>
        </div> 
        <main>
            <Main ref="main" />
        </main>

        <Footer />
    </div>
</template>

<script>
import Nav from '_c/nav.vue'
import Main from '_c/main.vue'
import Footer from '_c/footer.vue'
import { ElButton, ElMessage } from 'element-plus'
import { ref } from 'vue'
// import { loginUser } from '_ax/login.js'
export default {
    components: {
        Footer,
        Nav,
        ElButton,
        Main,
        ElMessage
    },
    methods: {
        showAnimation() {
            this.$refs.main.showContent()
        },
    },
    setup() {
        const scrollTop = ref(0)
        const readContent = () => {
            document.documentElement.scrollTop =
                document.documentElement.clientHeight
        }
        const param = {
            username: 'jay',
            password: 'jxl19971231'
        }
        // loginUser(param)
        //     .then(({ data, status }) => {
        //         if (status === 200) {
        //             localStorage.setItem('x-token', data.token)
        //         }
        //     })
        //     .catch(err => {
        //         ElMessage.error(err.message)
        //     })

        return {
            scrollTop,
            readContent,
        }
    },
}
</script>

<style lang="scss" scoped>
.header {
    height: 100vh;
}
.blog-img {
    background-image: url(../assets/back.webp);
    z-index: 1;
    visibility: visible;
    opacity: 1;
    width: 100%;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background-position: center center;
    background-size: cover;

    .read-content {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 150px;
        height: 50px;
        z-index: 10;
        background-color: transparent;
        border: 1px solid var(--main-color);
    }

    .read-content:hover {
        background-color: var(--danger-color);
        color: var(--main-color);
    }
}

.footer {
    height: 40px;
    width: 100%;
    background-image: linear-gradient(to right, #0b0c0b 0%, #050505 100%);
    color: #ccc;
    opacity: 0.8;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        padding: 0 20px;
    }

    .footer-icon {
        transform: translateY(1px);
    }
}
</style>>
