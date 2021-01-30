const path = require('path');

module.exports = {
    stories: ['../src/core/stories/*.stories.mdx', '../src/core/stories/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};
