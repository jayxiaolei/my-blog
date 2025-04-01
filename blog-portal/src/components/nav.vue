<template>
    <nav class="nav" :class="{ 'bg-color': top > 100 }">
        <div class="nav-content container">
            <img fetchpriority="high" src="../assets/jay.webp" alt="logo" class="logo" />
            <ul class="nav-menu">
                <li v-for="(item, index) in navList" :key="index" class="nav-item">
                    <el-icon color="white" :size="20" class="nva-icon">
                        <component :is="item.logo"></component>
                    </el-icon>
                    <router-link :to="item.path">
                        <span>
                            {{ item.text }}
                        </span>
                    </router-link>
                </li>
            </ul>
            <span class="nav-drawer">
                <el-dropdown trigger="click" @command="clickDropItem">
                    <span class="el-dropdown-link">
                        <el-icon :size="30" color="white"><Briefcase /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item, index) in navList" :key="index" :icon="item.logo" :command="item"
                                >{{ item.text }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
        </div>
    </nav>
</template>

<script>
import { HomeFilled, Briefcase, Camera } from '@element-plus/icons-vue';
import { ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { throttle } from '_a/index.js';

export default {
    components: {
        HomeFilled,
        ElIcon,
        Briefcase,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        Camera,
    },
    setup() {
        const navList = [
                {
                    text: '首页',
                    logo: HomeFilled,
                    path: '/index',
                },
                {
                    text: '照片墙',
                    logo: Camera,
                    path: '/photowall',
                },
            ],
            store = useStore(),
            top = computed(() => store.state.scrollTop),
            scrollBody = () => {
                store.commit('getScrollTop');
            };
        window.onscroll = throttle(scrollBody, 300);
        const router = useRouter();
        const clickDropItem = (item) => {
            router.push(item.path);
        };
        return {
            navList,
            top,
            clickDropItem,
        };
    },
};
</script>

<style lang="scss" scoped>
.nav {
    height: 64px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;

    .nav-drawer {
        cursor: pointer;
    }
    @media only screen and (min-width: 993px) {
        .container {
            width: 90%;
            max-width: 1125px;
        }

        .nav-drawer {
            display: none;
        }

        .nav-menu {
            list-style-type: none;
            display: flex;

            .nav-item {
                font-size: 16px;
                display: flex;
                margin: 8px;
                cursor: pointer;
                height: 100%;
            }

            .nav-item:hover .nva-icon {
                color: #bd7878;
            }

            .nav-item:hover a {
                color: #bd7878;
            }

            a {
                text-decoration: none;
                color: var(--main-color);
                font-size: 1rem;
                padding: 0 10px;
            }
        }
    }

    @media only screen and (max-width: 993px) {
        .container {
            width: 90%;
            max-width: 1125px;
        }

        .nav-menu {
            display: none;
        }
    }
    .nav-content {
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 auto;
        justify-content: space-between;
    }

    .logo {
        width: 40px;
        height: 52px;
    }
}

.bg-color {
    background-image: linear-gradient(to right, #0b0c0b 0%, #050505 100%);
    opacity: 0.7;
}
</style>
>
