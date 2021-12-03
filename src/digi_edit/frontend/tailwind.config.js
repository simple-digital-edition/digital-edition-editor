module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                text: '#000',
                primary: '#1d4ed8',
                'primary-contrast': '#fff',
                neutral: '#d1d5db',
                disabled: '#374151',
            }
        },
    },
    variants: {
        extend: {
            margin: ['last'],
        },
    },
    plugins: [],
}
