// .eslintrc.js
module.exports = {
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                    ['_v', './src/views'],
                    ['_c', './src/components'],
                    ['_ax', './src/axios'],
                    ['_a', './src/assets'],
                ],
                extensions: ['.js', '.json', '.vue'],
            },
        },
    },
};
