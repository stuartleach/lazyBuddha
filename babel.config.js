module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            'nativewind/babel',
            '@babel/plugin-proposal-export-namespace-from',
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        "@utils": "./utils",
                        "@styles": "./styles",
                        "@screens": "./screens",
                        "@components": "./components",
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    }
}