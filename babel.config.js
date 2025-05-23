module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            'nativewind/babel',
        ],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                        '@app': './app',
                        '@api': './api',
                        '@components': './components',
                        '^react-native$': 'react-native-web',
                    },
                },
            ],
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blocklist: null,
                    allowlist: null,
                    safe: false,
                    allowUndefined: true,
                    verbose: false,
                },
            ],
            'react-native-web',
        ],
    };
};
