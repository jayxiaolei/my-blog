<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <el-icon :size="20"><component :is="item.icon" /></el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <el-icon :size="20"><component :is="item.icon" /></el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { HomeFilled, UserFilled, Notebook, Comment } from '@element-plus/icons-vue'
import { ElSubMenu } from 'element-plus'
export default {
    components: {
        HomeFilled,
        UserFilled,
        Notebook,
        ElSubMenu,
        Comment
    },
    setup() {
        const items = [
            {
                icon: "HomeFilled",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "UserFilled",
                index: "/user",
                title: "用户管理",
            },
            {
                icon: "Notebook",
                index: "/article",
                title: "文章管理",
            },
            {
                icon: "Comment",
                index: "/comment",
                title: "评论管理",
            }
        ];

        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
