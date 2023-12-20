module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo',
            // '@babel/preset-env',
            '@babel/preset-react',
            'module:metro-react-native-babel-preset',
        ],
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
                        "@assets": "./assets",
                        "@constants": "./constants",
                        "@navigation": "./navigation",
                        "@fonts": "./assets/fonts",
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    }
}