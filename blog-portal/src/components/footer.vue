<template>
    <footer ref="main1" class="footer">
        <span>
            <el-icon color="#ccc" :size="14" class="footer-icon"><Avatar /></el-icon>
            总访问量:1111
        </span>
        <span>qq: 1227819030</span>
    </footer>
</template>

<script>
import { Avatar } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
export default {
    components: {
        Avatar,
        ElIcon,
    },
};
</script>

<style lang="scss" scoped>
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
</style>
