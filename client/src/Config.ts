export default {
    apiUrl:
        process.env.NODE_ENV === 'production'
            ? 'https://api.qrindr.com'
            : 'http://localhost:3000'
}