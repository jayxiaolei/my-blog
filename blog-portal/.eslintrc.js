// .eslintrc.js
module.exports = {
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                    ['_v', './src/views'],
                    ['_c', './src/components'],
                ],
                extensions: ['.js', '.json', '.vue'],
            },
        },
    },
};
