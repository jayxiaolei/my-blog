// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended', // 使用 ESLint 推荐的基本规则
        'plugin:import/recommended',
        // 'plugin:vue/vue3-recommended', // 使用 Vue 3 推荐的规则 (根据你的 Vue 版本选择 vue3-essential, vue3-strongly-recommended, 或 vue3-recommended)
        'plugin:prettier/recommended', // **重要：** 启用 eslint-plugin-prettier 和 eslint-config-prettier，确保这个是 extends 数组的最后一个
    ],
    settings: {
        'import/resolver': {
            alias: {
                extensions: ['.js', '.json', '.vue'],
            },
        },
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
        sourceType: 'module', // 使用 ES Modules
    },
    plugins: [
        'vue', // 启用 vue 插件 （虽然 'plugin:vue/vue3-recommended' 包含了它，显式写出有时更清晰）
    ],
    rules: {
        // 'compat/compat': 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'new-cap': [2, { capIsNew: false, newIsCapExceptions: ['mitt'] }],
        'max-depth': [0, 5],
        'max-nested-callbacks': [0, 3],
        complexity: [0, 20],
        'guard-for-in': 0,
        'vue/prefer-true-attribute-shorthand': 0,
        'vue/no-setup-props-destructure': 0,
        'vue/no-setup-props-reactivity-loss': 0,
        'vue/no-duplicate-attributes': [
            2,
            {
                allowCoexistClass: true,
                allowCoexistStyle: true,
            },
        ],
        'vue/component-definition-name-casing': [2, 'kebab-case'],
        'import/no-cycle': 2,
        // should be fixed in the highest priority
        'no-undef': 1,
        'no-console': 2,
        'import/no-unresolved': 1,
        'no-unused-vars': 1,
        'no-invalid-this': 1,
        'no-param-reassign': 1,
        'vue/no-mutating-props': 1,
        // should be fixed in high priority
        'no-var': 1,
        'prefer-const': 0,
        'one-var': 0,
        'no-inner-declarations': 1,
        'max-params': [
            1,
            {
                max: 5,
            },
        ],
        'vue/no-dupe-keys': 1,
        'vue/prefer-define-options': 1,
        // could be fixed in low priority
        radix: 0,
        'vue/attributes-order': 1,
        'vue/order-in-components': 1,
        'vue/no-empty-component-block': 0,
        'vue/define-macros-order': [
            1,
            {
                order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
                defineExposeLast: true,
            },
        ],
        'import/order': [
            1,
            {
                'newlines-between': 'always',
                pathGroups: [
                    {
                        // Minimatch pattern used to match against specifiers
                        pattern: '@/**',
                        // The predefined group this PathGroup is defined in relation to
                        group: 'external',
                        // How matching imports will be positioned relative to "group"
                        position: 'after',
                    },
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    // globals: {
    //     // 如果你使用了一些全局变量 (例如来自 <script setup>)，可以在这里定义
    //     defineProps: 'readonly',
    //     defineEmits: 'readonly',
    //     defineExpose: 'readonly',
    //     withDefaults: 'readonly',
    // },
};
