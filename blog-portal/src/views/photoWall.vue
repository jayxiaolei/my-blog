<template>
    <div class="photo-wall">
        <div class="bg-img">
            <div class="nav">
                <Nav />
            </div>
        </div>
        <main class="img-wrap">
            <div class="column">
                <img v-for="i in left" :key="i" class="item" :src="imgArr[i].img" />
            </div>
            <div class="column">
                <img v-for="i in middle" :key="i" class="item" :src="imgArr[i].img" />
            </div>

            <div v-if="clientWidth >= 993" class="column">
                <img v-for="i in right" :key="i" class="item" :src="imgArr[i].img" />
            </div>
        </main>

        <Footer />
    </div>
</template>

<script>
import imgArr from '_a/img.json';
import { throttle } from '_a/index.js';
import Footer from '_c/footer.vue';
import Nav from '_c/nav.vue';
import { onMounted, reactive, ref } from 'vue';
export default {
    components: {
        Nav,
        Footer,
    },
    setup() {
        const left = reactive([]),
            middle = reactive([]),
            right = reactive([]),
            clientWidth = ref(document.documentElement.clientWidth),
            loadImgHeights = (imgs) => {
                return new Promise((resolve) => {
                    const clientWidth = document.documentElement.clientWidth * 0.9 >= 1125 ? 1125 : document.documentElement.clientWidth * 0.9,
                        num = document.documentElement.clientWidth >= 993 ? 3 : 2,
                        length = imgs.length,
                        heights = [],
                        load = (index) => {
                            const img = new Image(),
                                checkIfFinished = () => {
                                    if (index === length - 1) {
                                        resolve(heights);
                                    }
                                };
                            img.onload = () => {
                                const ratio = img.height / img.width,
                                    perHeight = ratio * (clientWidth / num);
                                heights[index] = perHeight;
                                checkIfFinished();
                            };

                            img.onerror = () => {
                                heights[index] = 0;
                                checkIfFinished();
                            };
                            img.src = imgs[index].img;
                        };

                    imgs.forEach((img, index) => load(index));
                });
            },
            greedy = (heights) => {
                const clientWidth = document.documentElement.clientWidth;
                let leftHeight = 0,
                    midHeight = 0,
                    rightHeight = 0;
                left.splice(0);
                middle.splice(0);
                right.splice(0);

                if (clientWidth >= 993) {
                    heights.forEach((height, index) => {
                        if (leftHeight >= rightHeight && midHeight >= rightHeight) {
                            right.push(index);
                            rightHeight += height;
                        } else if (rightHeight >= leftHeight && midHeight >= leftHeight) {
                            left.push(index);
                            leftHeight += height;
                        } else {
                            middle.push(index);
                            midHeight += height;
                        }
                    });
                } else {
                    heights.forEach((height, index) => {
                        if (leftHeight >= midHeight) {
                            middle.push(index);
                            midHeight += height;
                        } else {
                            left.push(index);
                            leftHeight += height;
                        }
                    });
                }
            },
            getIndex = () => {
                loadImgHeights(imgArr).then((data) => {
                    greedy(data);
                });
            };

        onMounted(() => {
            getIndex();
            console.log(111);
        });

        window.onresize = throttle(() => {
            getIndex();
            clientWidth.value = document.documentElement.clientWidth;
        }, 400);

        return {
            left,
            middle,
            right,
            imgArr,
            clientWidth,
        };
    },
};
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
