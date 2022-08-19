module.exports = {
    // These paths are just examples, customize them to match your project structure
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'blue': '#2672FF',
            'gray': '#eef1f5',
            'text-gray': '#2b323d'
        },
        fontFamily: {
            sans: ['PingFangSC', 'PingFangSC-Regular'],
        },
    },
    plugins: [],
}