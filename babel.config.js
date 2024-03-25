module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel',
            '@babel/plugin-proposal-export-namespace-from',
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                    },
                },
            ],
            'react-native-reanimated/plugin',
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
    };
};
