module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            'nativewind/babel', // Add this line
            '@babel/plugin-proposal-export-namespace-from',
            'react-native-reanimated/plugin',
        ],
    }

};
