export default {
    apiUrl:
        process.env.NODE_ENV === 'production'
            ? 'https://api.qrindr.com'
            : 'https://api.qrindr.com'
}