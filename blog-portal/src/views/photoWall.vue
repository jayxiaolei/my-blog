<template>
    <div class="photo-wall">
        <div class="bg-img">
            <div class="nav">
                <Nav />
            </div>
        </div>
        <main class="img-wrap">
            <div class="column">
                <img
                    class="item"
                    :src="imgArr[i].img"
                    :key="i"
                    v-for="i in left"
                />
            </div>
            <div class="column">
                <img
                    class="item"
                    :src="imgArr[i].img"
                    :key="i"
                    v-for="i in middle"
                />
            </div>
            
            <div class="column" v-if="clientWidth >= 993">
                <img
                    class="item"
                    :src="imgArr[i].img"
                    :key="i"
                    v-for="i in right"
                />
            </div>
        </main>

        <Footer />
    </div>
</template>

<script>
import Nav from '_c/nav.vue'
import imgArr from '_a/img.json'
import { throttle } from '_a/index.js'
import { onMounted, reactive, ref } from 'vue'
import Footer from '_c/footer.vue'
export default {
    components: {
        Nav,
        Footer
    },
    setup() {
        let left = reactive([]),
            middle = reactive([]),
            right = reactive([])
        let clientWidth = ref(document.documentElement.clientWidth)
        const loadImgHeights = imgs => {
            return new Promise((resolve, reject) => {
                const clientWidth =
                    document.documentElement.clientWidth * 0.9 >= 1125
                        ? 1125
                        : document.documentElement.clientWidth * 0.9
                const num = document.documentElement.clientWidth >= 993 ? 3 : 2
                const length = imgs.length
                const heights = []
                const load = index => {
                    let img = new Image()
                    const checkIfFinished = () => {
                        if (index === length - 1) {
                            resolve(heights)
                        }
                    }
                    img.onload = () => {
                        const ratio = img.height / img.width
                        const perHeight = ratio * (clientWidth / num)
                        heights[index] = perHeight
                        checkIfFinished()
                    }

                    img.onerror = () => {
                        heights[index] = 0
                        checkIfFinished()
                    }
                    img.src = imgs[index].img
                }

                imgs.forEach((img, index) => load(index))
            })
        }

        let greedy = heights => {
            const clientWidth = document.documentElement.clientWidth
            let leftHeight = 0
            let midHeight = 0
            let rightHeight = 0
            left.splice(0)
            middle.splice(0)
            right.splice(0)

            if (clientWidth >= 993) {
                heights.forEach((height, index) => {
                    if (leftHeight >= rightHeight && midHeight >= rightHeight) {
                        right.push(index)
                        rightHeight += height
                    } else if (
                        rightHeight >= leftHeight &&
                        midHeight >= leftHeight
                    ) {
                        left.push(index)
                        leftHeight += height
                    } else {
                        middle.push(index)
                        midHeight += height
                    }
                })
            } else {
                heights.forEach((height, index) => {
                    if (leftHeight >= midHeight) {
                        middle.push(index)
                        midHeight += height
                    } else {
                        left.push(index)
                        leftHeight += height
                    }
                })
            }
        }

        const getIndex = () => {
            loadImgHeights(imgArr).then(data => {
                greedy(data)
            })
        }

        onMounted(() => {
            getIndex()
        })

        window.onresize = throttle(() => {
            getIndex()
            clientWidth.value = document.documentElement.clientWidth
        }, 400)

        return {
            left,
            middle,
            right,
            imgArr,
            clientWidth
        }
    },
}
</script>

<style scoped lang="scss">
.bg-img {
    background-image: url('https://img.mgwhw.com/upload/2416/2020/12-10/20201210204755348990_small.jpg');
    background-position: center center;
    background-size: cover;
    height: 400px;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    opacity: 1;
}

.img-wrap {
    width: 90%;
    max-width: 1125px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    margin-top: 50px;

    .column {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 2px;

        .item {
            margin-bottom: 5px;
            width: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
}
</style>